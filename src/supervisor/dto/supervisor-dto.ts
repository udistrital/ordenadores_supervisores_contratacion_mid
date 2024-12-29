import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class SupervisorQueryDto {
  @IsBoolean()
  @IsOptional()
  Estado?: boolean;

  @IsString()
  @IsOptional()
  SedeSupervisor?: string;

  @IsString()
  @IsOptional()
  DependenciaSupervisor?: string;
}
