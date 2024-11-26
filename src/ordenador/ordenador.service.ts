import { Injectable } from '@nestjs/common';
import { OrdenadorQueryDto } from './dto/ordenador-dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';

@Injectable()
export class OrdenadorService {
  private readonly axiosInstance: AxiosInstance;
  constructor(private configService: ConfigService) {}

  async getOrdenadores(queryParams: OrdenadorQueryDto) {
    try {
      const endpoint: string = this.configService.get<string>('ENDP_ORDENADORES_SUPERVISORES');
      const url = `${endpoint}ordenador_gasto`;
      const { data } = await axios.get<StandardResponse<any>>(url);
      return data.Data;
    } catch (error) {
      return null;
    }
  }
}
