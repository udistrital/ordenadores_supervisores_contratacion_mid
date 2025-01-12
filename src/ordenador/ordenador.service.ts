import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Ordenador } from 'src/interfaces/internal.interfaces';
import { StandardResponse } from 'src/interfaces/responses.interfaces';

@Injectable()
export class OrdenadorService {
  constructor(private configService: ConfigService) {}

  async getOrdenadores(rol: number): Promise<StandardResponse<Ordenador[]>> {
    try {
      const endpoint: string =
        this.configService.get<string>('ENDP_ORDENADORES');
      const { data } = await axios.get<Ordenador[]>(endpoint);

      const filteredOrdenadores = data.filter(
        (ordenador) => ordenador.cargo_id === rol,
      );

      if (filteredOrdenadores.length === 0) {
        return {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: `No se encontraron ordenadores para el cargo ${rol}`,
        };
      }

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Ordenadores recuperados exitosamente',
        Data: filteredOrdenadores,
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