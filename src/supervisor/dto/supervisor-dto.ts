import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SupervisorQueryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID de la dependencia',
    example: 'DEP123',
  })
  dependencia: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Fecha de consulta (YYYY-MM-DD)',
    example: '2024-12-29',
  })
  fecha: string;
}
