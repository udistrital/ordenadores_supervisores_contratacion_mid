import { Injectable } from '@nestjs/common';
import { SupervisorQueryDto } from './dto/supervisor-dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import {
  SupervidorDependenciaResponse,
  Dependencia,
  Contrato,
  SupervisorDocumentoResponse,
} from '../interfaces/internal.interfaces';
import { DEPENDENCIAS_MAPPING } from '../constants/dependencias.dictionary';

@Injectable()
export class SupervisorService {
  private readonly axiosInstance: AxiosInstance;

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
        'El ID de dependencia proporcionado no es válido',
        HttpStatus.BAD_REQUEST,
      );
    }

    return dependenciaLegacy;
  }

  async getSupervisorPorDependencia(
    queryParams: SupervisorDependenciaDto,
  ): Promise<StandardResponse<Dependencia[]>> {
    try {
      const dependenciaLegacy = this.validateAndTransformDependencia(
        queryParams.dependencia,
      );
      const url = this.buildSupervisorUrl({
        ...queryParams,
        dependencia: dependenciaLegacy,
      });
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
      return null;
    }
  }
}
