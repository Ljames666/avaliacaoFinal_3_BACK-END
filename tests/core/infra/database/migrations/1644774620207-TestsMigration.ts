import {MigrationInterface, QueryRunner} from "typeorm";

export class TestsMigration1644774620207 implements MigrationInterface {
    name = 'TestsMigration1644774620207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" varchar PRIMARY KEY NOT NULL, "avatarURL" varchar NOT NULL, "address" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "occupation" varchar NOT NULL, "about" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "userLogon" ("id" varchar PRIMARY KEY NOT NULL, "userLogon" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_30b50d9e6406cdbc444e92d782" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "details" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_profiles" ("id" varchar PRIMARY KEY NOT NULL, "avatarURL" varchar NOT NULL, "address" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "occupation" varchar NOT NULL, "about" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_profiles"("id", "avatarURL", "address", "state", "country", "phoneNumber", "occupation", "about", "user_id", "created_at", "updated_at") SELECT "id", "avatarURL", "address", "state", "country", "phoneNumber", "occupation", "about", "user_id", "created_at", "updated_at" FROM "profiles"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`ALTER TABLE "temporary_profiles" RENAME TO "profiles"`);
        await queryRunner.query(`CREATE TABLE "temporary_userLogon" ("id" varchar PRIMARY KEY NOT NULL, "userLogon" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_30b50d9e6406cdbc444e92d782" UNIQUE ("user_id"), CONSTRAINT "FK_30b50d9e6406cdbc444e92d7820" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_userLogon"("id", "userLogon", "user_id", "created_at", "updated_at") SELECT "id", "userLogon", "user_id", "created_at", "updated_at" FROM "userLogon"`);
        await queryRunner.query(`DROP TABLE "userLogon"`);
        await queryRunner.query(`ALTER TABLE "temporary_userLogon" RENAME TO "userLogon"`);
        await queryRunner.query(`CREATE TABLE "temporary_messages" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "details" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_830a3c1d92614d1495418c46736" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_messages"("id", "description", "details", "user_id", "created_at", "updated_at") SELECT "id", "description", "details", "user_id", "created_at", "updated_at" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "temporary_messages" RENAME TO "messages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "details" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "messages"("id", "description", "details", "user_id", "created_at", "updated_at") SELECT "id", "description", "details", "user_id", "created_at", "updated_at" FROM "temporary_messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
        await queryRunner.query(`ALTER TABLE "userLogon" RENAME TO "temporary_userLogon"`);
        await queryRunner.query(`CREATE TABLE "userLogon" ("id" varchar PRIMARY KEY NOT NULL, "userLogon" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_30b50d9e6406cdbc444e92d782" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "userLogon"("id", "userLogon", "user_id", "created_at", "updated_at") SELECT "id", "userLogon", "user_id", "created_at", "updated_at" FROM "temporary_userLogon"`);
        await queryRunner.query(`DROP TABLE "temporary_userLogon"`);
        await queryRunner.query(`ALTER TABLE "profiles" RENAME TO "temporary_profiles"`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" varchar PRIMARY KEY NOT NULL, "avatarURL" varchar NOT NULL, "address" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "occupation" varchar NOT NULL, "about" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "profiles"("id", "avatarURL", "address", "state", "country", "phoneNumber", "occupation", "about", "user_id", "created_at", "updated_at") SELECT "id", "avatarURL", "address", "state", "country", "phoneNumber", "occupation", "about", "user_id", "created_at", "updated_at" FROM "temporary_profiles"`);
        await queryRunner.query(`DROP TABLE "temporary_profiles"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "userLogon"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
