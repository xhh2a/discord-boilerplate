// Update with your config settings.

import { connectionData } from './src/db/db.js';

export default {

  development: {
    client: 'postgresql',
    connection: connectionData(),
    debug: true,
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: connectionData(),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
