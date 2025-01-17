import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { StandardResponse } from 'src/interfaces/responses.interfaces';

@Injectable()
export class OrdenadorService {
  constructor(private configService: ConfigService) {}

  async getOrdenador(idArgoContrato: number): Promise<StandardResponse<any>> {
    try {
      const urlRolOrdenador: string =
        this.configService.get<string>('ENDP_ROL_ORDENADOR');

      const url = `${urlRolOrdenador}/ordenadores/${idArgoContrato}`;
      const { data } = await axios.get<any>(url);

      if (
        !data ||
        !data.ordenadores?.ordenador ||
        data.ordenadores?.ordenador?.length === 0
      ) {
        return {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: `Ordenador no encontrado`,
        };
      }

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Ordenador encontrato exitosamente',
        Data: data.ordenadores?.ordenador[0],
      };
    } catch (error) {
      return {
        Success: false,
        Status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error.message || 'Error interno del servidor',
      };
    }
  }
}
