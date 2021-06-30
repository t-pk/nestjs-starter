import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSession {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
