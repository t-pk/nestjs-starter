import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveLanguages {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
