import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableToken1640550673174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "userLogon",

        columns: [
          { name: "token", type: "uuid", isNullable: false, isPrimary: true },

          { name: "userLogon", type: "varchar", isNullable: false },

          { name: "user_id", type: "uuid", isNullable: false },

          { name: "created_at", type: "timestamp", default: "now()" },

          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "token_user_fk",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userLogon");
  }
}
