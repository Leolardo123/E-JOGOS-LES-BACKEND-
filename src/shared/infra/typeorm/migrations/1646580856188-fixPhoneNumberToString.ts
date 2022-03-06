import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPhoneNumberToString1646580856188 implements MigrationInterface {
    name = 'fixPhoneNumberToString1646580856188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "cellphone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "cellphone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "number" integer NOT NULL`);
    }

}
