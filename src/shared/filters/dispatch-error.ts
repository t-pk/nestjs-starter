import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Dictionary } from 'lodash';
import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} from 'sequelize';
import { MessageCodeError } from '../errors/message-code-error';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

const MESSAGE = 'x-message';
const CODE = 'x-message-code-error';
const HTTP_STATUS = 'x-httpStatus-error';
@Catch(
  MessageCodeError,
  ValidationError,
  HttpException,
  Error,
  TokenExpiredError
)
export class DispatchError extends ValidationPipe implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public catch(err: unknown | any, host: ArgumentsHost): unknown {
    const res = host.switchToHttp().getResponse();
    res.header('Content-Type', 'application/json');
    Logger.log(err);
    switch (err.constructor) {
      case MessageCodeError:
        res.header(CODE, err.errorMessage);
        res.header(MESSAGE, err.message);
        res.header(HTTP_STATUS, err.httpStatus);
        return res.status(err.httpStatus).send(err);

      case ValidationError:
        res.header(CODE, (err as ValidationError).message);
        res.header(MESSAGE, (err as ValidationError).message);
        res.header(HTTP_STATUS, HttpStatus.BAD_REQUEST);
        return res.status(HttpStatus.BAD_REQUEST).send(err);

      case UnauthorizedException:
        res.header(CODE, err.status);
        res.header(MESSAGE, err.message);
        res.header(HTTP_STATUS, err.status);
        return res.status(err.status).send(err.response);

      case ForbiddenException:
        res.header(CODE, err.response.statusCode);
        res.header(MESSAGE, err.response.message);
        return res.status(err.response.statusCode).send(err.response);

      case BadRequestException:
        const invalidInfo = err.message;
        return res.status(HttpStatus.BAD_REQUEST).send({
          content: Array.isArray(err.response.message)
            ? // prettier-ignore
              err.response.message.join(', ')
            : err.response.message,
          message: 'Data invalid',
          invalidInfo,
        });

      case UniqueConstraintError:
        return res.status(HttpStatus.BAD_REQUEST).send({
          content: Array.isArray(err.errors)
            ? // prettier-ignore
              err.errors.map((item: Dictionary<string>) => item.message).join(', ')
            : err,
          message: 'Data invalid',
        });

      case ForeignKeyConstraintError:
        return res.status(HttpStatus.BAD_REQUEST).send({
          content: err.parent.detail,
          message: 'Data invalid',
        });

      case NotFoundException:
        res.header(CODE, err.status);
        res.header(MESSAGE, err.message);
        res.header(HTTP_STATUS, HttpStatus.NOT_FOUND);
        return res.status(HttpStatus.NOT_FOUND).send(err);

      case TokenExpiredError:
      case JsonWebTokenError:
        res.header(CODE, HttpStatus.UNAUTHORIZED);
        res.header(MESSAGE, err.message);
        res.header(HTTP_STATUS, HttpStatus.UNAUTHORIZED);
        return res.status(HttpStatus.UNAUTHORIZED).send(err);

      default:
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
