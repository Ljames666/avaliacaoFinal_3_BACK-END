import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1640489326654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",

        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },

          { name: "name", type: "varchar", isNullable: false },

          { name: "username", type: "varchar", isNullable: false },

          { name: "email", type: "varchar", isNullable: false, isUnique: true },

          { name: "password", type: "varchar", isNullable: false, isUnique: true },

          { name: "created_at", type: "timestamp" },

          { name: "updated_at", type: "timestamp" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
