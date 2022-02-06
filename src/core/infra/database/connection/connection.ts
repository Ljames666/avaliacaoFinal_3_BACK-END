import { Connection, createConnection, getConnection } from "typeorm";

export class DatabaseConnection {
  private static connection: Connection;

  static dbConnection() {
    let conn = getConnection();

    if (!conn) {
      throw new Error("Database is not connected.");
    }

    return DatabaseConnection.connection;
  }

  static async serverConnection() {
    if (!DatabaseConnection.connection) {
      this.connection = await createConnection();
    }
  }
}
