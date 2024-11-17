import { Controller, Get, Query } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorQueryDto } from './dto/supervisor-dto';

@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Get()
  async getSupervisores(@Query() queryParams: SupervisorQueryDto) {
    return this.supervisorService.getSupervisores(queryParams);
  }
}
