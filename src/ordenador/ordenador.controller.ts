import { Controller, Get, Param } from '@nestjs/common';
import { OrdenadorService } from './ordenador.service';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ordenadores')
@Controller('ordenadores')
export class OrdenadorController {
  constructor(private readonly ordenadorService: OrdenadorService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener ordenador Argo por ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID ordenador Argo',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Ordenador encontrado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Ordenador no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrdenador(@Param('id') id: number): Promise<StandardResponse<any>> {
    return await this.ordenadorService.getOrdenador(id);
  }
}
