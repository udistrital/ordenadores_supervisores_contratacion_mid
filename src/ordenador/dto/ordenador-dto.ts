import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class OrdenadorQueryDto {

//Posible data a traer
  @IsBoolean()
  @IsOptional()
  Estado?: boolean;

  @IsString()
  @IsOptional()
  RolId?: string;

  @IsString()
  @IsOptional()
  SedeOrdenador?: string;

  @IsString()
  @IsOptional()
  DependenciaOrdenador?: string;
}
