import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMIssingColumn1650048114603 implements MigrationInterface {
    name = 'fixMIssingColumn1650048114603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_d9328add7be49a1d0131c1822dc"`);
        await queryRunner.query(`CREATE TABLE "coupom" ("id" uuid NOT NULL, "code" character varying NOT NULL, "value" integer NOT NULL DEFAULT '0', "type_id" character varying NOT NULL DEFAULT 'free_product', CONSTRAINT "PK_dac9504d91710ffbdd15752cb7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_purchases" ("id" uuid NOT NULL, "total_price" integer NOT NULL, "person_id" character varying NOT NULL, "status_id" character varying NOT NULL DEFAULT 'pending', "payment_id" character varying NOT NULL, CONSTRAINT "PK_7cad9595706b9a2dcf6ac28e1e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "personId"`);
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "status_id" character varying NOT NULL DEFAULT 'open'`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "UQ_c1d9b1541a4feb420184fe38c35" UNIQUE ("cart_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "UQ_c1d9b1541a4feb420184fe38c35"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "personId" uuid`);
        await queryRunner.query(`DROP TABLE "tb_purchases"`);
        await queryRunner.query(`DROP TABLE "coupom"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_d9328add7be49a1d0131c1822dc" FOREIGN KEY ("personId") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
