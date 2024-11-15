import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class SupervisorQueryDto {

  //Posible data a traer
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
