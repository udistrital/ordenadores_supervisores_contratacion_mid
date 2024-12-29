import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import {
  SupervisorDependenciaDto,
  SupervisorDocumentoDto,
} from './dto/supervisor-dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StandardResponse } from 'src/interfaces/responses.interfaces';
import { Contrato, Dependencia } from '../interfaces/internal.interfaces';

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
    queryParams: SupervisorDependenciaDto,
  ): Promise<StandardResponse<Dependencia[]>> {
    return this.supervisorService.getSupervisorPorDependencia(queryParams);
  }

  @Get('documento')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener supervisores por número de documento' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Franjas del supervisor encontrados exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron Franjas para el documento especificado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Formato de documento inválido',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
  })
  async getSupervisorPorDocumento(
    @Query(new ValidationPipe({ transform: true }))
    params: SupervisorDocumentoDto,
  ): Promise<StandardResponse<Contrato[]>> {
    return this.supervisorService.getSupervisorPorDocumento(params);
  }
}
