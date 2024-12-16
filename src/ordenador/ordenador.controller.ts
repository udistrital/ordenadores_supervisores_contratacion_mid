import { Controller, Get, HttpException, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { OrdenadorService } from './ordenador.service';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Ordenador } from 'src/interfaces/internal.interfaces';

@Controller('ordenador')
export class OrdenadorController {
  constructor(private readonly ordenadorService: OrdenadorService) {}

  @Get('')
  @ApiOperation({ summary: 'Consulta ordenadores por cargo' })
  @ApiQuery({
    name: 'rol',
    type: 'number',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Ordenadores encontrados exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Ordenadores no encontrados' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrdenadores(
    @Query('rol', new ParseIntPipe({ 
      errorHttpStatusCode: HttpStatus.BAD_REQUEST 
    })) rol: number,
  ): Promise<StandardResponse<Ordenador[]>> {
    return await this.ordenadorService.getOrdenadores(rol);
  }
}