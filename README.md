
<p align="center">
<a href="http://nestjs.com/"  target="blank"><img  src="https://docs.nestjs.com/assets/logo-small.svg"  width="100"  alt="Nest Logo" /></a>
<a href="https://sequelize.org/master"  target="blank"><img  src="https://sequelize.org/v5/manual/asset/logo-small.png"  width="100"  alt="Sequelize Logo" /></a>
<a href="https://www.postgresql.org"  target="blank"><img  src="https://www.postgresql.org/media/img/about/press/elephant.png"  width="100"  alt="PostgreSql Logo" /></a>
<a href="https://jwt.io"  target="blank"><img  src="https://jwt.io/img/pic_logo.svg"  width="100"  alt="JWT Logo" /></a>
  
[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/yarn-1.22.10-brightgreen" alt="Yarn Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/node-14.17.1-orange" alt="Yarn Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Yarn Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/coverage-%3E90%25-blue" alt="Yarn Version" /></a>
</p>

## Description

This project for beginners made of [Nest](https://github.com/nestjs/nest) combined with some powerful libraries such as: [Fastify](https://github.com/fastify/fastify), [Sequelize](https://github.com/sequelize/sequelize), [JWT](https://github.com/nestjs/jwt)...
written in [Typescript](https://github.com/microsoft/TypeScript) and uses [PostgreSQL](https://github.com/postgres/postgres) as the database.

## Introduction

This source code to help you get started with Nestjs.

## Installation
Source code works on Node version `14.17.1` and Yarn version `1.22.10`. If you don't have it, install it first.
The setup and startup steps I describe in the Installation section.

```bash
1. Open Git bash.
2. git clone https://github.com/pktai/nestjs-starter.git.
3. cd nestjs-starter.
4. yarn.
5. setup .env file. Please open the file `env.example` and set the environment variables properly.

```

Below are the variables in env.

```bash

NODE_ENV=development

DB_DIALECT=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=language
DB_HOST=127.0.0.1
DB_PORT=5432

SECRET_TOKEN=jsonwebtoken
EXPIRESIN_ACCESS_TOKEN=5m
EXPIRESIN_REFRESH_TOKEN=15m

RATE_LIMIT_TIME_WINDOW=30000
RATE_LIMIT_MAX=100
DEFAULT_LIMIT_PAGE=10

SERVICE_PORT=3001
SERVICE_NAME='0.0.0.0'

```


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

**Before running the test command. you need to run command `yarn db:migrate` to init data**

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Describe

```bash
.
├───.github
│   └───workflows
├───.husky
│   └───_
├───.vscode
├───assets
├───db
│   ├───migrations
│   └───seeders
├───src
│   ├───entities
│   ├───modules
│   │   ├───auth
│   │   │   ├───dto
│   │   │   └───roles
│   │   ├───database
│   │   ├───language
│   │   │   └───dto
│   │   └───user
│   │       └───dto
│   └───shared
│       ├───config
│       │   └───interfaces
│       ├───errors
│       ├───filters
│       ├───interfaces
│       ├───models
│       ├───paginate
│       │   └───interfaces
│       └───utils
└───tests
    ├───auth
    ├───database
    ├───languages
    ├───shared
    └───users

```

## Coverage test results

To prove the source code is really good. I have set up and run unit tests almost all the functionality in the source code. below are the results.


```bash

----------------------------------|---------|----------|---------|---------|-------------------
File                              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------------|---------|----------|---------|---------|-------------------
All files                         |   97.67 |    93.55 |     100 |    97.4 |                   
 src/entities                     |     100 |      100 |     100 |     100 |                   
  index.ts                        |     100 |      100 |     100 |     100 |                   
  languages.ts                    |     100 |      100 |     100 |     100 |                   
  users.ts                        |     100 |      100 |     100 |     100 |                   
 src/modules/auth                 |     100 |      100 |     100 |     100 | 
  auth.controller.ts              |     100 |      100 |     100 |     100 | 
  auth.module.ts                  |     100 |      100 |     100 |     100 | 
  auth.service.ts                 |     100 |      100 |     100 |     100 | 
  jwt-auth.guard.ts               |     100 |      100 |     100 |     100 | 
  jwt.strategy.ts                 |     100 |      100 |     100 |     100 | 
 src/modules/auth/dto             |     100 |      100 |     100 |     100 | 
  create-session.ts               |     100 |      100 |     100 |     100 | 
  update-session.ts               |     100 |      100 |     100 |     100 | 
 src/modules/auth/roles           |     100 |      100 |     100 |     100 | 
  roles.decorator.ts              |     100 |      100 |     100 |     100 | 
  roles.enum.ts                   |     100 |      100 |     100 |     100 | 
 src/modules/database             |     100 |      100 |     100 |     100 | 
  UnitOfWork.ts                   |     100 |      100 |     100 |     100 | 
  database.module.ts              |     100 |      100 |     100 |     100 | 
  database.provider.ts            |     100 |      100 |     100 |     100 | 
  repository.database.provider.ts |     100 |      100 |     100 |     100 | 
 src/modules/language             |     100 |      100 |     100 |     100 | 
  language.controller.ts          |     100 |      100 |     100 |     100 | 
  language.module.ts              |     100 |      100 |     100 |     100 | 
  language.service.ts             |     100 |      100 |     100 |     100 | 
 src/modules/language/dto         |     100 |      100 |     100 |     100 | 
  index.ts                        |     100 |      100 |     100 |     100 | 
  query-language.ts               |     100 |      100 |     100 |     100 | 
  remove-language.ts              |     100 |      100 |     100 |     100 | 
  upsert-language.ts              |     100 |      100 |     100 |     100 | 
 src/modules/user                 |     100 |      100 |     100 |     100 | 
  user.controller.ts              |     100 |      100 |     100 |     100 | 
  user.module.ts                  |     100 |      100 |     100 |     100 | 
  user.service.ts                 |     100 |      100 |     100 |     100 | 
 src/modules/user/dto             |     100 |      100 |     100 |     100 | 
  create-user.ts                  |     100 |      100 |     100 |     100 | 
  index.ts                        |     100 |      100 |     100 |     100 | 
 src/shared                       |     100 |      100 |     100 |     100 | 
  index.ts                        |     100 |      100 |     100 |     100 | 
 src/shared/config                |     100 |      100 |     100 |     100 | 
  database.ts                     |     100 |      100 |     100 |     100 | 
  error-message.ts                |     100 |      100 |     100 |     100 | 
 src/shared/errors                |     100 |      100 |     100 |     100 | 
  index.ts                        |     100 |      100 |     100 |     100 | 
  message-code-error.ts           |     100 |      100 |     100 |     100 | 
 src/shared/filters               |   76.74 |       60 |     100 |   75.61 | 
  dispatch-error.ts               |   76.74 |       60 |     100 |   75.61 | 43-52,86,105     
 src/shared/paginate              |     100 |      100 |     100 |     100 | 
  index.ts                        |     100 |      100 |     100 |     100 | 
  paginate.ts                     |     100 |      100 |     100 |     100 | 
  pagination.ts                   |     100 |      100 |     100 |     100 | 
 src/shared/utils                 |     100 |      100 |     100 |     100 | 
  crypto.ts                       |     100 |      100 |     100 |     100 | 
  reponse.ts                      |     100 |      100 |     100 |     100 | 
 tests/auth                       |     100 |      100 |     100 |     100 | 
  data-example.ts                 |     100 |      100 |     100 |     100 | 
 tests/languages                  |     100 |      100 |     100 |     100 | 
  data-example.ts                 |     100 |      100 |     100 |     100 | 
 tests/users                      |     100 |      100 |     100 |     100 | 
  data-example.ts                 |     100 |      100 |     100 |     100 | 
----------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 6 passed, 6 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        8.371 s
Ran all test suites.
Done in 9.07s.

```


## Support

If there is a problem in the source code, please open the Issues tab or click [here](https://github.com/pktai/nestjs-starter/issues). I'm really grateful to the contributors. It motivates me to go further.

## Stay in touch

- Author - [Tai Pham](https://facebook.com/pktai.iot)

## License

  [MIT licensed](LICENSE).
