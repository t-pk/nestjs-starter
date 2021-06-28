import {
  IsOptional,
  IsString,
  IsNumber,
  Max,
  IsBooleanString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryLanguage {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly iconId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  readonly status: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  readonly email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Max(50000)
  @Type(() => Number)
  readonly limit: number;

  route?: string;
}
