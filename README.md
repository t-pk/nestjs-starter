
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

Beginner's kit project made with [Nest](https://github.com/nestjs/nest) combined with some powerful libraries such as: [Fastify](https://github.com/fastify/fastify), [Sequelize](https://github.com/sequelize/sequelize), [JWT](https://github.com/nestjs/jwt)...
written in [Typescript](https://github.com/microsoft/TypeScript) and uses [PostgreSQL](https://github.com/postgres/postgres) as the database.

## Introduction

The project was formed to meet those of you who are in the process of learning how to build nestjs


## Installation

```bash
$ git clone https://github.com/pktai/nestjs-starter.git
```
Source code works on node version 14.17.1 and yarn version 1.22.10

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

## Support

This is an MIT-licensed open source project. It can grow thanks to the support by the amazing backers. If you'd like to join them, please [read more here](https://github.com/pktai/nestjs-sequelize-typescript/issues).

## Stay in touch

- Author - [Tai Pham](https://facebook.com/pktai.iot)

## License

  [MIT licensed](LICENSE).
