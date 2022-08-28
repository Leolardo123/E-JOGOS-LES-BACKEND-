import {MigrationInterface, QueryRunner} from "typeorm";

export class fixProducts1661645680065 implements MigrationInterface {
    name = 'fixProducts1661645680065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "guarantee"`);
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "recomended_age"`);
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "players_offline"`);
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "players_online"`);
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "resolution"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "resolution" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "players_online" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "players_offline" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "recomended_age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "guarantee" character varying NOT NULL`);
    }

}
