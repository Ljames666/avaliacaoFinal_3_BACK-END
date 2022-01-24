require("dotenv/config");
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.ENTITY], //trocar para dist antes do deploy
  migrations: [process.env.MIGRATION], //trocar para dist antes do deploy
  cli: {
    entitiesDir: "src/core/infra/database/models", //trocar para dist antes do deploy
    migrationsDir: "src/core/infra/database/migrations", //trocar para dist antes do deploy
  },
  subscribers: [],

  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
