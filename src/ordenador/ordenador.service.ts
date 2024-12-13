import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';

@Injectable()
export class OrdenadorService {
  constructor(private configService: ConfigService) {}

  async getOrdenadores(rol: string): Promise<StandardResponse<any>> {
    try {
      const endpoint: string = this.configService.get<string>('ENDP_ORDENADORES');
      
      // Añade el rol como parámetro de consulta si es necesario
      const url = `${endpoint}`;
      
      const { data } = await axios.get(url);

      if (!data) {
        return {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'Rol de ordenador no encontrado',
        };
      }

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Ordenadores recuperados exitosamente',
        Data: data
      };
    } catch (error) {
      return {
        Success: false,
        Status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error.message || 'Error al consultar los ordenadores',
      };
    }
  }
}