import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DispatchError, MessageCodeError } from '../../src/shared';
import { DatabaseModule } from '../../src/modules/database/database.module';

describe('database', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new DispatchError());
    await app.init();
  });

  it(`share error`, async () => {
    expect(new MessageCodeError('auth:header:null')).toBeInstanceOf(MessageCodeError);
    expect(new MessageCodeError('auth:tokenExpired')).toBeInstanceOf(MessageCodeError);
    expect(new MessageCodeError('content:body:null')).toBeInstanceOf(MessageCodeError);
    expect(new MessageCodeError('content:key:exists')).toBeInstanceOf(MessageCodeError);
    expect(new MessageCodeError('user:create:missingInformation')).toBeInstanceOf(MessageCodeError);

    expect(() => new MessageCodeError('tai')).toThrowError(
      'Unable to find message code error.'
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
