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
        return res.status(err.httpStatus).send(err);

      case ValidationError:
        return res.status(HttpStatus.BAD_REQUEST).send(err);

      case UnauthorizedException:
        return res.status(err.status).send(err.response);

      case ForbiddenException:
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
        return res.status(HttpStatus.NOT_FOUND).send(err);

      case TokenExpiredError:
      case JsonWebTokenError:
        return res.status(HttpStatus.UNAUTHORIZED).send(err);

      default:
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
