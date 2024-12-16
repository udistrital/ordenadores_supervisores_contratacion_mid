import { Module } from '@nestjs/common';
import { RolOrdenadorService } from './rol_ordenador.service';
import { RolOrdenadorController } from './rol_ordenador.controller';

@Module({
  controllers: [RolOrdenadorController],
  providers: [RolOrdenadorService],
})
export class RolOrdenadorModule {}
