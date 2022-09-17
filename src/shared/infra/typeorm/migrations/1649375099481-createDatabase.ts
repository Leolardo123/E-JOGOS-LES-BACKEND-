import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1649375099481 implements MigrationInterface {
    name = 'createDatabase1649375099481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_products" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "requirements" character varying NOT NULL, "publisher" character varying NOT NULL, "developer" character varying NOT NULL, "guarantee" character varying NOT NULL, "language" character varying NOT NULL, "subtitle" character varying NOT NULL, "release_date" character varying NOT NULL, "recomended_age" integer NOT NULL, "players_offline" integer NOT NULL, "players_online" integer NOT NULL, "resolution" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_26292104cb895b49349b5353003" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_carts_items" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "cart_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_480709bba97ca7979bf298bca64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_item_carts" ("id" uuid NOT NULL, "total_price" integer NOT NULL, "personId" uuid, CONSTRAINT "PK_f1effbae54a68fdaffee971b8d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_genders" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "personsId" uuid, CONSTRAINT "PK_ad4433ee86ecc6885a91b560532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_phones" ("id" uuid NOT NULL, "number" character varying NOT NULL, "ddd" integer NOT NULL, "person_id" uuid NOT NULL, CONSTRAINT "REL_26973d11e13ec316b40eae12f6" UNIQUE ("person_id"), CONSTRAINT "PK_91419dd4de201e2b2eb80a9faf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_brand" ("id" uuid NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_928f649ba57cedcea7b2294d122" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_cards" ("id" uuid NOT NULL, "owner_name" character varying NOT NULL, "number" character varying NOT NULL, "brand_id" character varying NOT NULL, "user_id" uuid NOT NULL, "security_code" character varying NOT NULL, "bandeira_id" uuid, CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL, "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_in" integer NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_persons" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "gender_id" integer NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_f0dc0d17f29a844a6089e0aef8" UNIQUE ("user_id"), CONSTRAINT "PK_2af079ba897e0e01ca2ae609e42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_person_addresses" ("id" uuid NOT NULL, "person_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "REL_a78b61626faf2959ca29a81a1f" UNIQUE ("address_id"), CONSTRAINT "PK_407b70f79c3a8e88a5f79713299" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_addresses_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_aae6705201c6fc0f9e792bd101b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_places_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_c53e8458e5e67a3ea19fb918119" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_addresses" ("id" uuid NOT NULL, "cep" character varying NOT NULL, "number" integer NOT NULL, "address_type_id" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying, "neighborhood" character varying NOT NULL, "place" character varying NOT NULL, "place_type_id" integer NOT NULL, CONSTRAINT "PK_86c23d37552ae8e71ecbcfd46d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677" FOREIGN KEY ("product_id") REFERENCES "tb_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_d9328add7be49a1d0131c1822dc" FOREIGN KEY ("personId") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_genders" ADD CONSTRAINT "FK_91f282ce53f7a991adfae356acb" FOREIGN KEY ("personsId") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD CONSTRAINT "FK_26973d11e13ec316b40eae12f6e" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_a5799c7dafb4932ff7c5f14fb0d" FOREIGN KEY ("bandeira_id") REFERENCES "tb_brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY ("address_type_id") REFERENCES "tb_addresses_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY ("place_type_id") REFERENCES "tb_places_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6dafc292779632e155ff084e5ad"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_d3a1a9b2f8dddd7e36474615a37"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_a5799c7dafb4932ff7c5f14fb0d"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP CONSTRAINT "FK_26973d11e13ec316b40eae12f6e"`);
        await queryRunner.query(`ALTER TABLE "tb_genders" DROP CONSTRAINT "FK_91f282ce53f7a991adfae356acb"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_d9328add7be49a1d0131c1822dc"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17"`);
        await queryRunner.query(`DROP TABLE "tb_addresses"`);
        await queryRunner.query(`DROP TABLE "tb_places_types"`);
        await queryRunner.query(`DROP TABLE "tb_addresses_types"`);
        await queryRunner.query(`DROP TABLE "tb_person_addresses"`);
        await queryRunner.query(`DROP TABLE "tb_persons"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "tb_cards"`);
        await queryRunner.query(`DROP TABLE "tb_brand"`);
        await queryRunner.query(`DROP TABLE "tb_phones"`);
        await queryRunner.query(`DROP TABLE "tb_genders"`);
        await queryRunner.query(`DROP TABLE "tb_item_carts"`);
        await queryRunner.query(`DROP TABLE "tb_carts_items"`);
        await queryRunner.query(`DROP TABLE "tb_products"`);
    }

}
