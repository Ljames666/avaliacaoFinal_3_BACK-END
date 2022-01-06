import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableMessages1640490055576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "messages",

        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },

          { name: "description", type: "varchar", isNullable: false },

          { name: "details", type: "varchar", isNullable: false },

          { name: "user_id", type: "uuid", isNullable: false },

          { name: "created_at", type: "timestamp", default: "now()" },

          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "message_user_fk",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("messages");
  }
}
