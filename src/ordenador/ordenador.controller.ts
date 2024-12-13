import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { OrdenadorService } from './ordenador.service';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('ordenador')
export class OrdenadorController {
  constructor(private readonly ordenadorService: OrdenadorService) { }

  @Get('')
  @ApiOperation({ summary: 'Consulta ordenadores por rol' })
  @ApiQuery({
    name: 'rol',
    type: 'string',
    required: true,
  })
  async getOrdenadores(
    @Query('rol') rol: string,
  ): Promise<StandardResponse<any>> {
    if (!rol) {
      throw new HttpException(
        {
          Success: false,
          Status: HttpStatus.BAD_REQUEST,
          Message: 'El rol es requerido',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const result = await this.ordenadorService.getOrdenadores(rol);
    return result;
  }
}
