import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedCard1658390320185 implements MigrationInterface {
    name = 'fixedCard1658390320185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "person_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "person_id" character varying NOT NULL`);
    }

}
