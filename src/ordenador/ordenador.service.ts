import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Ordenador } from 'src/interfaces/internal.interfaces';
import { StandardResponse, UsuarioResponse } from 'src/interfaces/responses.interfaces';

@Injectable()
export class OrdenadorService {
  constructor(private configService: ConfigService) {}

  async getOrdenadores(rol: number): Promise<StandardResponse<(Ordenador & { tercero?: UsuarioResponse })[]>> {
    try {
      const endpoint: string = this.configService.get<string>('ENDP_ORDENADORES');
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

      const ordenadorConTercero = await Promise.all(
        filteredOrdenadores.map(async (ordenador) => {
          try {
            const terceroInfo = await this.obtenerTercero(Number(ordenador.documento_identidad));
            return {
              ...ordenador,
              tercero: terceroInfo
            };
          } catch (error) {
            return {
              ...ordenador,
              tercero: null
            };
          }
        })
      );

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Ordenadores recuperados exitosamente',
        Data: ordenadorConTercero,
      };
    } catch (error) {
      return {
        Success: false,
        Status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error.message || 'Error al consultar los ordenadores',
      };
    }
  }

  async obtenerTercero(id: number): Promise<UsuarioResponse> {
    try {
      const endpoint: string = this.configService.get<string>('ENDP_TERCEROS_CRUD');

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