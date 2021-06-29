/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');
config();

function initConfigDatabase() {
  const init = {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log,
    force: true,
    timezone: '+07:00',
  };

  return init;
}

const init = initConfigDatabase();
module.exports = init;
