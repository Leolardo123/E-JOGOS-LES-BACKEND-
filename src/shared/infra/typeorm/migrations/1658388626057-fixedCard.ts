import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedCard1658388626057 implements MigrationInterface {
    name = 'fixedCard1658388626057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_26d44dc906b92c061a6320cd850"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "person_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_26d44dc906b92c061a6320cd850" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
