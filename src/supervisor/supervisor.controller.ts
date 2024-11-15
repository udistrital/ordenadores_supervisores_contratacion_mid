import { Controller, Get, Query } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';

@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Get()
  async getSupervisores(@Query() queryParams: any) {
    return this.supervisorService.getSupervisores(queryParams);
  }
}
