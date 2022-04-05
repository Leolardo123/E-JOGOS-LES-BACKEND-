import {MigrationInterface, QueryRunner} from "typeorm";

export class createCardsAndProducts1648685559493 implements MigrationInterface {
    name = 'createCardsAndProducts1648685559493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_brand" ("id" uuid NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_928f649ba57cedcea7b2294d122" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_cards" ("id" uuid NOT NULL, "owner_name" character varying NOT NULL, "number" integer NOT NULL, "brand_id" character varying NOT NULL, "user_id" uuid NOT NULL, "security_code" character varying NOT NULL, "bandeira_id" uuid, CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_products" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "cart_id" character varying NOT NULL, "publisher" character varying NOT NULL, "developer" character varying NOT NULL, "guarantee" character varying NOT NULL, "language" character varying NOT NULL, "subtitle" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_26292104cb895b49349b5353003" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_carts_items" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "cart_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_480709bba97ca7979bf298bca64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_item_carts" ("id" uuid NOT NULL, "total_price" integer NOT NULL, "personId" uuid, CONSTRAINT "PK_f1effbae54a68fdaffee971b8d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tb_genders_id_seq" OWNED BY "tb_genders"."id"`);
        await queryRunner.query(`ALTER TABLE "tb_genders" ALTER COLUMN "id" SET DEFAULT nextval('"tb_genders_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6dafc292779632e155ff084e5ad"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tb_addresses_types_id_seq" OWNED BY "tb_addresses_types"."id"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses_types" ALTER COLUMN "id" SET DEFAULT nextval('"tb_addresses_types_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tb_places_types_id_seq" OWNED BY "tb_places_types"."id"`);
        await queryRunner.query(`ALTER TABLE "tb_places_types" ALTER COLUMN "id" SET DEFAULT nextval('"tb_places_types_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_a5799c7dafb4932ff7c5f14fb0d" FOREIGN KEY ("bandeira_id") REFERENCES "tb_brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_26d44dc906b92c061a6320cd850" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677" FOREIGN KEY ("product_id") REFERENCES "tb_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_d9328add7be49a1d0131c1822dc" FOREIGN KEY ("personId") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY ("address_type_id") REFERENCES "tb_addresses_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY ("place_type_id") REFERENCES "tb_places_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6dafc292779632e155ff084e5ad"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_d9328add7be49a1d0131c1822dc"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_26d44dc906b92c061a6320cd850"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_a5799c7dafb4932ff7c5f14fb0d"`);
        await queryRunner.query(`ALTER TABLE "tb_places_types" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tb_places_types_id_seq"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY ("place_type_id") REFERENCES "tb_places_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses_types" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tb_addresses_types_id_seq"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY ("address_type_id") REFERENCES "tb_addresses_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_genders" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tb_genders_id_seq"`);
        await queryRunner.query(`DROP TABLE "tb_item_carts"`);
        await queryRunner.query(`DROP TABLE "tb_carts_items"`);
        await queryRunner.query(`DROP TABLE "tb_products"`);
        await queryRunner.query(`DROP TABLE "tb_cards"`);
        await queryRunner.query(`DROP TABLE "tb_brand"`);
    }

}
