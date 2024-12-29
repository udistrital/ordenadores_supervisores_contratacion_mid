import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorQueryDto } from './dto/supervisor-dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import { Dependencia } from '../interfaces/internal.interfaces';

@ApiTags('Supervisores')
@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Get('dependencia')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener supervisores por dependencia' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supervisores encontrados exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron supervisores',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
  })
  async getSupervisorDependencia(
    @Query(new ValidationPipe({ transform: true }))
    queryParams: SupervisorQueryDto,
  ): Promise<StandardResponse<Dependencia[]>> {
    return this.supervisorService.getSupervisores(queryParams);
  }
}
