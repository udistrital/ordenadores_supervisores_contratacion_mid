import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { SupervisorQueryDto } from './dto/supervisor-dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import {
  SupervidorDependenciaResponse,
  Dependencia,
} from '../interfaces/internal.interfaces';

@Injectable()
export class SupervisorService {
  private readonly logger = new Logger(SupervisorService.name);
  private readonly supervisorEndpoint: string;

  constructor(private readonly configService: ConfigService) {
    this.supervisorEndpoint = this.configService.get<string>(
      'ENDP_SUPERVISOR_DEPENDENCIA',
    );

    if (!this.supervisorEndpoint) {
      throw new Error('ENDP_SUPERVISOR_DEPENDENCIA configuration is missing');
    }
  }

  async getSupervisores(
    queryParams: SupervisorQueryDto,
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

  private buildSupervisorUrl(queryParams: SupervisorQueryDto): string {
    return `${this.supervisorEndpoint}/${queryParams.dependencia}/${queryParams.fecha}`;
  }

  private handleError(error: unknown): StandardResponse<Dependencia[]> {
    this.logger.error('Error en getSupervisores:', error);

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
