import { Controller, Get, Query } from '@nestjs/common';
import { OrdenadorService } from './ordenador.service';
import { OrdenadorQueryDto } from './dto/ordenador-dto';

@Controller('ordenador')
export class OrdenadorController {
  constructor(private readonly ordenadorService: OrdenadorService) {}

  @Get()
  async getOrdenadores(@Query() queryParams: OrdenadorQueryDto) {
    return this.ordenadorService.getOrdenadores(queryParams);
  }
}
