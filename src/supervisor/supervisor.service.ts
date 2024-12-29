import { Injectable } from '@nestjs/common';
import { SupervisorQueryDto } from './dto/supervisor-dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';

@Injectable()
export class SupervisorService {
  private readonly axiosInstance: AxiosInstance;
  constructor(private configService: ConfigService) {}

  async getSupervisores(queryParams: SupervisorQueryDto) {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_ORDENADORES_SUPERVISORES',
      );
      const url = `${endpoint}supervisor_contrato`;
      const { data } = await axios.get<StandardResponse<any>>(url);
      return data.Data;
    } catch (error) {
      return null;
    }
  }
}
