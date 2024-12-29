import {
  Controller,
  Get,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RolOrdenadorService } from './rol_ordenador.service';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('rol-ordenador')
export class RolOrdenadorController {
  constructor(private readonly rolOrdenadorService: RolOrdenadorService) {}

  @Get('')
  @ApiOperation({ summary: 'Consulta roles de ordenadores' })
  async getOrdenadores(): Promise<StandardResponse<any>> {
    const result = await this.rolOrdenadorService.getRolOrdenadores();
    return result;
  }

  @Get('actual')
  @ApiOperation({ summary: 'Consulta el ordenador actual por cargo' })
  @ApiQuery({
    name: 'rol',
    type: 'number',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Ordenador encontrado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Ordenadores no encontrados' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrdenadorActual(
    @Query(
      'rol',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    rol: number,
  ): Promise<StandardResponse<any>> {
    return await this.rolOrdenadorService.getOrdenadorActual(rol);
  }
}
