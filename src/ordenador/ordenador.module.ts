import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdenadorService } from './ordenador.service';
import { OrdenadorController } from './ordenador.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrdenadorController],
  providers: [OrdenadorService],
})
export class OrdenadorModule {}
