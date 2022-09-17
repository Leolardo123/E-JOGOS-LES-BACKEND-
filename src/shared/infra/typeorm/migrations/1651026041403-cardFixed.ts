import {MigrationInterface, QueryRunner} from "typeorm";

export class cardFixed1651026041403 implements MigrationInterface {
    name = 'cardFixed1651026041403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_26d44dc906b92c061a6320cd850" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_26d44dc906b92c061a6320cd850"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "person_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37" FOREIGN KEY ("user_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
