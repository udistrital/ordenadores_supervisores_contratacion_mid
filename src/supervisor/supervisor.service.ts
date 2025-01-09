import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  SupervisorDependenciaDto,
  SupervisorDocumentoDto,
} from './dto/supervisor-dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { StandardResponse, UsuarioResponse } from 'src/interfaces/responses.interfaces';
import {
  SupervidorDependenciaResponse,
  Dependencia,
  Contrato,
  SupervisorDocumentoResponse,
} from '../interfaces/internal.interfaces';
import { DEPENDENCIAS_MAPPING } from '../constants/dependencias.dictionary';

@Injectable()
export class SupervisorService {
  private readonly logger = new Logger(SupervisorService.name);
  private readonly supervisorDependenciaEndpoint: string;
  private readonly supervisorDocumentoEndpoint: string;

  constructor(private readonly configService: ConfigService) {
    this.supervisorDependenciaEndpoint = this.configService.get<string>(
      'ENDP_SUPERVISOR_DEPENDENCIA',
    );

    if (!this.supervisorDependenciaEndpoint) {
      throw new Error('No se ha detectado ENDP_SUPERVISOR_DEPENDENCIA');
    }

    this.supervisorDocumentoEndpoint = this.configService.get<string>(
      'ENDP_SUPERVISOR_POR_DOCUMENTO',
    );

    if (!this.supervisorDocumentoEndpoint) {
      throw new Error('No se ha detectado ENDP_SUPERVISOR_POR_DOCUMENTO');
    }
  }

  private validateAndTransformDependencia(dependenciaId: string): string {
    const dependenciaLegacy: string = DEPENDENCIAS_MAPPING[dependenciaId];

    if (!dependenciaLegacy) {
      this.logger.error(
        `Dependencia no encontrada en el diccionario: ${dependenciaId}`,
      );
      throw new HttpException(
        {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: `No se encontró la dependencia con identificador: ${dependenciaId}. Por favor, verifique el ID proporcionado.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return dependenciaLegacy;
  }

  async getSupervisorPorDependencia(
    queryParams: SupervisorDependenciaDto,
  ): Promise<StandardResponse<Dependencia[]>> {
    try {
      const dependenciaLegacy = this.validateAndTransformDependencia(
        queryParams.dependenciaId,
      );
      const url = this.buildSupervisorUrl({
        ...queryParams,
        dependenciaId: dependenciaLegacy,
      });
      const { data } = await axios.get<SupervidorDependenciaResponse>(url);

      if (!data?.supervisor?.dependencia) {
        throw new HttpException(
          {
            Success: false,
            Status: HttpStatus.NOT_FOUND,
            Message: `No se encontraron supervisores para la dependencia ${queryParams.dependenciaId} en la fecha ${queryParams.fecha}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const dependenciasConTerceros = await Promise.all(
        data.supervisor.dependencia.map(async (dependencia) => {
          try {
            const terceroInfo = await this.obtenerTercero(Number(dependencia.documento));
            return {
              ...dependencia,
              tercero: terceroInfo
            };
          } catch (error) {
            this.logger.warn(`Error al obtener tercero para documento ${dependencia.documento}: ${error.message}`);
            return {
              ...dependencia,
              tercero: null
            };
          }
        })
      );

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Supervisores encontrados exitosamente',
        Data: data.supervisor.dependencia,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private buildSupervisorUrl(queryParams: SupervisorDependenciaDto): string {
    return `${this.supervisorDependenciaEndpoint}/${queryParams.dependenciaId}/${queryParams.fecha}`;
  }

  async getSupervisorPorDocumento(
    params: SupervisorDocumentoDto,
  ): Promise<StandardResponse<(Contrato & { tercero?: UsuarioResponse })[]>> {
    try {
      const url = `${this.supervisorDocumentoEndpoint}/${params.documento}`;
      const { data } = await axios.get<SupervisorDocumentoResponse>(url);

      if (!data?.supervisor?.contrato?.length) {
        throw new HttpException(
          'No se encontraron franjas para el documento especificado',
          HttpStatus.NOT_FOUND,
        );
      }

      const terceroInfo = await this.obtenerTercero(Number(params.documento));

      const contratosConTercero = data.supervisor.contrato.map(contrato => ({
        ...contrato,
        tercero: terceroInfo
      }));

      const contratosOrdenados = this.ordenarContratos(contratosConTercero);

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Franjas del supervisor encontrados exitosamente',
        Data: contratosOrdenados,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private ordenarContratos(contratos: Contrato[]): Contrato[] {
    return [...contratos].sort(
      (a, b) =>
        new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime(),
    );
  }

  private handleError(error: unknown): StandardResponse<any> {
    this.logger.error('Error en SupervisorService:', error);

    if (error instanceof HttpException) {
      const errorResponse = error.getResponse();
      const errorMessage =
        typeof errorResponse === 'object'
          ? (errorResponse as any).Message || error.message
          : error.message;

      return {
        Success: false,
        Status: error.getStatus(),
        Message: errorMessage,
      };
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>; // Tipamos la respuesta
      return {
        Success: false,
        Status: axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        Message:
          axiosError.response?.data?.message ||
          `Error en la comunicación con el servicio externo: ${axiosError.code || 'Unknown error'}`,
      };
    }

    return {
      Success: false,
      Status: HttpStatus.INTERNAL_SERVER_ERROR,
      Message:
        error instanceof Error ? error.message : 'Error interno del servidor',
    };
  }

  async obtenerTercero(id: number): Promise<UsuarioResponse> {
    try {
      const endpoint: string =
        this.configService.get<string>('ENDP_TERCEROS_CRUD');

      if (!endpoint) {
        throw new Error('No se encontró la URL del servicio de terceros');
      }

      const { data } = await axios.get<UsuarioResponse>(
        `${endpoint}tercero/identificacion?query=${id}`,
      );
      return data;
    } catch (error) {
      return null;
    }
  }
}
