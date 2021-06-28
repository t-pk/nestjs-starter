import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/error-message.interface';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'user:create:missingInformation': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new user with missing information.',
    userMessage: 'Unable to create a new user with missing information.',
  },

  'content:key:exists': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'key exists.',
    userMessage: 'key exists.',
  },

  'content:body:null': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'not null.',
    userMessage: 'not null.',
  },

  'auth:header:null': {
    type: 'Unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Unauthorized',
    userMessage: 'Unauthorized',
  },
  'auth:tokenExpired': {
    type: 'Unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'jwt expired',
    userMessage: 'jwt expired',
  },
};
