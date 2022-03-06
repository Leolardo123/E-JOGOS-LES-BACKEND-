import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserPersonRelation1646594663005 implements MigrationInterface {
    name = 'fixUserPersonRelation1646594663005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_7436254f477ecbaa760b8d558f0"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "REL_7436254f477ecbaa760b8d558f"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "UQ_f0dc0d17f29a844a6089e0aef86" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "UQ_f0dc0d17f29a844a6089e0aef86"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "REL_7436254f477ecbaa760b8d558f" UNIQUE ("person_id")`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_7436254f477ecbaa760b8d558f0" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
