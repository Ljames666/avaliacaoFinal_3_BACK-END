import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableContacts1652444709658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',

        columns: [
          { name: 'id', type: 'uuid', isNullable: false, isPrimary: true },

          { name: 'avatarURL', type: 'varchar', length: '100' },

          { name: 'name', type: 'varchar', length: '100', isNullable: false },

          { name: 'email', type: 'varchar', length: '150', isNullable: false },

          { name: 'address', type: 'json' },

          { name: 'phoneNumber', type: 'json' },

          { name: 'description', type: 'varchar' },

          { name: 'user_id', type: 'uuid', isNullable: false },

          { name: 'created_at', type: 'timestamp' },

          { name: 'updated_at', type: 'timestamp' },
        ],
        foreignKeys: [
          {
            name: 'Contacts_user_fk',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
