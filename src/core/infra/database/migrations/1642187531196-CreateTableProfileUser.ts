import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProfileUser1642187531196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profiles",

        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },
          { name: "avatarURL", type: "varchar", length: "100" },
          { name: "address", type: "varchar", length: "50", isNullable: false },
          { name: "state", type: "varchar", length: "2", isNullable: false },
          { name: "country", type: "varchar", length: "30", isNullable: false },
          { name: "phoneNumber", type: "varchar", length: "15", isNullable: false },
          { name: "occupation", type: "varchar", length: "50", isNullable: false },
          { name: "about", type: "varchar", length: "255", isNullable: false },

          { name: "user_id", type: "uuid", isNullable: false },

          { name: "created_at", type: "timestamp" },

          { name: "updated_at", type: "timestamp" },
        ],
        foreignKeys: [
          {
            name: "Profile_user_fk",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("profiles");
  }
}
