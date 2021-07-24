import { FastifyRequest } from 'fastify';
import { errorResponseBuilderContext } from 'fastify-rate-limit';

const CSP = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    },
  },
};

const responseRateLimitError = (
  _: FastifyRequest,
  context: errorResponseBuilderContext
): { code: number; error: string; message: string; date: Date } => {
  return {
    code: 429,
    error: 'Too Many Requests',
    message: `This services only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
    date: new Date(),
  };
};

const responseNotFound = {
  code: 404,
  message: 'Not Found.',
};

export { CSP, responseRateLimitError, responseNotFound };
