import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertLanguage {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly iconId: string;

  @ApiProperty()
  @IsOptional()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly createdBy: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly updatedBy: string;
}
