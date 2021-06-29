import {
  // IsEnum,
  // IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Roles } from 'src/modules/auth/roles/roles.decorator';

export class CreateUser {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;

  // @ApiPropertyOptional()
  // @IsString()
  // @IsOptional()
  // @IsEnum(Roles, { each: true })
  // readonly roles?: string;
}
