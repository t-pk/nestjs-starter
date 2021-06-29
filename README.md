
<p align="center">
<a href="http://nestjs.com/"  target="blank"><img  src="https://docs.nestjs.com/assets/logo-small.svg"  width="100"  alt="Nest Logo" /></a>
<a href="https://www.fastify.io/"  target="blank"><img  src="https://github.com/fastify/graphics/blob/master/fastify-1000px-square-01.png"  width="100"  alt="Fastify Logo" /></a>
<a href="https://sequelize.org/master"  target="blank"><img  src="https://sequelize.org/v5/manual/asset/logo-small.png"  width="100"  alt="Sequelize Logo" /></a>
<a href="https://www.typescriptlang.org"  target="blank"><img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png"  width="100"  alt="Typescript Logo" /></a>
<a href="https://www.postgresql.org"  target="blank"><img  src="https://www.postgresql.org/media/img/about/press/elephant.png"  width="100"  alt="PostgreSql Logo" /></a>
<a href="https://jwt.io"  target="blank"><img  src="https://jwt.io/img/pic_logo.svg"  width="100"  alt="JWT Logo" /></a>
  
[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/yarn-1.22.10-brightgreen" alt="Yarn Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/node-14.17.1-orange" alt="Yarn Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Yarn Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/coverage-%3E90%25-blue" alt="Yarn Version" /></a>
</p>

## Description

Beginner's kit project made with [Nest](https://github.com/nestjs/nest) combined with some powerful libraries such as: [Fastify](https://github.com/fastify/fastify), [Sequelize](https://github.com/sequelize/sequelize), [JWT](https://github.com/nestjs/jwt)...
written in [Typescript](https://github.com/microsoft/TypeScript) and uses [PostgreSQL](https://github.com/postgres/postgres) as the database.

## Installation

```bash
$ yarn install
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
|   .commitlintrc.json
|   .env
|   .env.example
|   .eslintrc
|   .gitignore
|   .lintstagedrc
|   .prettierrc
|   .sequelizerc
|   LICENSE
|   nest-cli.json
|   package.json
|   README.md
|   tsconfig.build.json
|   tsconfig.json
|   yarn.lock
|
+---.github
|   |   config.yml
|   |   FUNDING.yml
|   |   stale.yml
|   |
|   \---workflows
|           test.yml
|
+---.husky
|   |   .gitignore
|   |   pre-commit
|   |
|   \---_
|           husky.sh
|
+---.vscode
|       extensions.json
|       launch.json
|       settings.json
|       tasks.json
|
+---db
|   |   config.ts
|   |
|   +---migrations
|   |       20210629104501-create-user.js
|   |
|   \---seeders
+---src
|   |   app.module.ts
|   |   main.ts
|   |
|   +---entities
|   |       index.ts
|   |       languages.ts
|   |       users.ts
|   |
|   +---modules
|   |   +---auth
|   |   |   |   auth.controller.ts
|   |   |   |   auth.module.ts
|   |   |   |   auth.service.ts
|   |   |   |   jwt-auth.guard.ts
|   |   |   |   jwt.strategy.ts
|   |   |   |
|   |   |   +---dto
|   |   |   |       create-session.ts
|   |   |   |       interfaces.ts
|   |   |   |       update-session.ts
|   |   |   |
|   |   |   \---roles
|   |   |           roles.decorator.ts
|   |   |           roles.enum.ts
|   |   |
|   |   +---database
|   |   |       database.module.ts
|   |   |       database.provider.ts
|   |   |       repository.database.provider.ts
|   |   |       UnitOfWork.ts
|   |   |
|   |   +---language
|   |   |   |   language.controller.ts
|   |   |   |   language.module.ts
|   |   |   |   language.service.ts
|   |   |   |
|   |   |   \---dto
|   |   |           index.ts
|   |   |           query-language.ts
|   |   |           remove-language.ts
|   |   |           upsert-language.ts
|   |   |
|   |   \---user
|   |       |   user.controller.ts
|   |       |   user.module.ts
|   |       |   user.service.ts
|   |       |
|   |       \---dto
|   |               create-user.ts
|   |               index.ts
|   |
|   \---shared
|       |   index.ts
|       |
|       +---config
|       |   |   database.ts
|       |   |   error-message.ts
|       |   |   policy.ts
|       |   |
|       |   \---interfaces
|       |           data-base.interface.ts
|       |           error-message.interface.ts
|       |
|       +---errors
|       |       index.ts
|       |       message-code-error.ts
|       |
|       +---filters
|       |       dispatch-error.ts
|       |
|       +---interfaces
|       |       index.ts
|       |       request.ts
|       |       session.ts
|       |
|       +---models
|       |       paginition-model.ts
|       |
|       +---paginate
|       |   |   index.ts
|       |   |   paginate.ts
|       |   |   pagination.ts
|       |   |
|       |   \---interfaces
|       |           index.ts
|       |
|       \---utils
|               crypto.ts
|               reponse.ts
|
\---tests
    |   jest-e2e.json
    |
    +---auth
    |       index.e2e-spec.ts
    |
    +---database
    |       index.e2e-spec.ts
    |
    +---dispatch_error
    |       index.e2e-spec.ts
    |
    +---languages
    |       index.e2e-spec.ts
    |
    \---users
            index.e2e-spec.ts

```

## Support

This is an MIT-licensed open source project. It can grow thanks to the support by the amazing backers. If you'd like to join them, please [read more here](https://github.com/pktai/nestjs-sequelize-typescript/issues).

## Stay in touch

- Author - [Tai Pham](https://facebook.com/pktai.iot)

## License

  [MIT licensed](LICENSE).
