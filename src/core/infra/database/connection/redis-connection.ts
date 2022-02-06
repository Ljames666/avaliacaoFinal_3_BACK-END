import redis, { Redis } from "ioredis";
require("dotenv/config");

export class RedisConnection {
  private static _connection: Redis;
  static initConnection() {
    if (!this._connection) {
      this._connection = new redis(process.env.REDISCLOUD_URL);
    }
  }

  static getConnection() {
    if (!this._connection) {
      throw new Error("Redisnot connection!");
    }

    return this._connection;
  }
}
