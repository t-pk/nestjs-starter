import { getRoute } from '../../src/shared/utils/reponse';

describe('request route', () => {
  it(`[REQUEST ROUTE] Set up routing on the internet environment`, async () => {
    const req = {
      context: {
        config: {
          url: '/api/example',
        },
      },
      hostname: 'localhost:4000',
      protocol: 'http',
    };
    expect(getRoute(req)).toContain('http://localhost:4000/api/example');
  });

  it(`get route request empty`, async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let req: any;
    expect(getRoute(req)).toContain('http://127.0.0.1:3000/api/example');
  });
});
