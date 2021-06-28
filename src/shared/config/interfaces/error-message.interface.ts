import { HttpStatus } from '@nestjs/common';

export interface IErrorMessages {
  readonly type: string;
  readonly httpStatus: HttpStatus;
  readonly errorMessage: string;
  readonly userMessage: string;
}
