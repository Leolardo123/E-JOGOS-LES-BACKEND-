import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCards1650648397399 implements MigrationInterface {
    name = 'fixCards1650648397399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_a5799c7dafb4932ff7c5f14fb0d"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37"`);
        await queryRunner.query(`CREATE TABLE "tb_purchases_coupons" ("id" uuid NOT NULL, "coupon_id" character varying NOT NULL, "purchase_id" character varying NOT NULL, "purchaseId" uuid, CONSTRAINT "UQ_22ddfcbd6c920c56d23f4634c72" UNIQUE ("purchase_id", "coupon_id"), CONSTRAINT "PK_8ae2cc317cfc0ca750cce8723a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "bandeira_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "person_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "role" character varying NOT NULL DEFAULT 'Padrão'`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "cart_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "brand_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "brand_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupom" ALTER COLUMN "type_id" SET DEFAULT 'return_product'`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY ("brand_id") REFERENCES "tb_brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37" FOREIGN KEY ("user_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_coupons" ADD CONSTRAINT "FK_87d36bdfd59dd6885cc01ebde7f" FOREIGN KEY ("purchaseId") REFERENCES "tb_purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases_coupons" DROP CONSTRAINT "FK_87d36bdfd59dd6885cc01ebde7f"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039"`);
        await queryRunner.query(`ALTER TABLE "coupom" ALTER COLUMN "type_id" SET DEFAULT 'free_product'`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "brand_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "brand_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "bandeira_id" uuid`);
        await queryRunner.query(`DROP TABLE "tb_purchases_coupons"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_a5799c7dafb4932ff7c5f14fb0d" FOREIGN KEY ("bandeira_id") REFERENCES "tb_brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
