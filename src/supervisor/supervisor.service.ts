import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  SupervisorDependenciaDto,
  SupervisorDocumentoDto,
} from './dto/supervisor-dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import {
  SupervidorDependenciaResponse,
  Dependencia,
  Contrato,
  SupervisorDocumentoResponse,
} from '../interfaces/internal.interfaces';

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

  async getSupervisorPorDependencia(
    queryParams: SupervisorDependenciaDto,
  ): Promise<StandardResponse<Dependencia[]>> {
    try {
      const url = this.buildSupervisorUrl(queryParams);
      const { data } = await axios.get<SupervidorDependenciaResponse>(url);

      if (!data?.supervisor?.dependencia) {
        throw new HttpException(
          'No se encontraron datos de supervisores',
          HttpStatus.NOT_FOUND,
        );
      }

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
    return `${this.supervisorDependenciaEndpoint}/${queryParams.dependencia}/${queryParams.fecha}`;
  }

  async getSupervisorPorDocumento(
    params: SupervisorDocumentoDto,
  ): Promise<StandardResponse<Contrato[]>> {
    try {
      const url = `${this.supervisorDocumentoEndpoint}/${params.documento}`;
      const { data } = await axios.get<SupervisorDocumentoResponse>(url);

      if (!data?.supervisor?.contrato?.length) {
        throw new HttpException(
          'No se encontraron contratos para el documento especificado',
          HttpStatus.NOT_FOUND,
        );
      }

      const contratosOrdenados = this.ordenarContratos(
        data.supervisor.contrato,
      );

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
      return {
        Success: false,
        Status: error.getStatus(),
        Message: error.message,
      };
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        Success: false,
        Status: axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        Message:
          axiosError.message ||
          'Error en la comunicación con el servicio externo',
      };
    }

    return {
      Success: false,
      Status: HttpStatus.INTERNAL_SERVER_ERROR,
      Message: 'Error interno del servidor',
    };
  }
}
