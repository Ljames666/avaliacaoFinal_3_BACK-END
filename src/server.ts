import "reflect-metadata";
import { DatabaseConnection } from "./core/infra/database/connection/connection";
import { RedisConnection } from "./core/infra/database/connection/redis-connection";
import { initServer } from "./core/presentation/init-server";

DatabaseConnection.serverConnection()
  .then(() => {
    RedisConnection.initConnection();
    initServer();
  })
  .catch((error) => {
    console.log(error);
  });
