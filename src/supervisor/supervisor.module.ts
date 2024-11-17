import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';

@Module({
  imports: [HttpModule],
  controllers: [SupervisorController],
  providers: [SupervisorService],
})
export class SupervisorModule {}
