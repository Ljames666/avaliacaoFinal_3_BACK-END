require('dotenv/config');

let config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.ENTITY],
  migrations: [process.env.MIGRATION],
  cli: {
    entitiesDir: 'src/core/infra/database/models',
    migrationsDir: 'src/core/infra/database/migrations',
  },
  subscribers: [],
  synchronize: false,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

if (process.env.NODE_ENV === 'test') {
  config = {
    type: 'sqlite',
    database: './dbtest.sqlite',
    entities: [process.env.ENTITY],
    migrations: [process.env.MIGRATIONS_TEST],
    cli: {
      entitiesDir: 'src/core/infra/database/models',
      migrationsDir: 'tests/core/infra/database/migrations',
    },
    synchronize: false,
  };
}

module.exports = config;
