import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntities1646502602404 implements MigrationInterface {
    name = 'updateEntities1646502602404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL, "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_in" integer NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "ddd"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "ddd" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "ddd"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "ddd" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
