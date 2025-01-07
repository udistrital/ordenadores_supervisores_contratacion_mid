import { IsString, IsNotEmpty, IsDateString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SupervisorDependenciaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID de la dependencia',
    example: '123',
  })
  dependenciaId: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Fecha de consulta (YYYY-MM-DD)',
    example: '2024-12-29',
  })
  fecha: string;
}

export class SupervisorDocumentoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'El documento debe contener solo números',
  })
  @ApiProperty({
    description: 'Número de documento del supervisor',
    example: '123456789',
  })
  documento: string;
}
