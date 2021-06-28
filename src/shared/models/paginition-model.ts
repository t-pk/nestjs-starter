import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginitionModel {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly page: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly limit: number;
}
