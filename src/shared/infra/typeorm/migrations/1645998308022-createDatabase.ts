import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1645998308022 implements MigrationInterface {
    name = 'createDatabase1645998308022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_address_types" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_357a16ef7df3481d17a8a4d9c10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_place_types" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_647d2e3e0f627d6b24abe15e1f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_addresses" ("id" uuid NOT NULL, "cep" character varying NOT NULL, "number" integer NOT NULL, "address_type_id" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying, "neighborhood" character varying NOT NULL, "place" character varying NOT NULL, "place_type_id" integer NOT NULL, CONSTRAINT "PK_86c23d37552ae8e71ecbcfd46d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_genders" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ad4433ee86ecc6885a91b560532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_phones" ("id" uuid NOT NULL, "number" character varying NOT NULL, "ddd" character varying NOT NULL, "person_id" uuid NOT NULL, CONSTRAINT "REL_26973d11e13ec316b40eae12f6" UNIQUE ("person_id"), CONSTRAINT "PK_91419dd4de201e2b2eb80a9faf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "person_id" uuid NOT NULL, CONSTRAINT "REL_7436254f477ecbaa760b8d558f" UNIQUE ("person_id"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_persons" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" integer NOT NULL, "birth_date" TIMESTAMP NOT NULL, "gender_id" integer NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "REL_8a026400b2766a1df0d8790535" UNIQUE ("address_id"), CONSTRAINT "REL_16c3a260805188fc6bdb85d63d" UNIQUE ("gender_id"), CONSTRAINT "PK_2af079ba897e0e01ca2ae609e42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY ("address_type_id") REFERENCES "tb_address_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY ("place_type_id") REFERENCES "tb_place_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD CONSTRAINT "FK_26973d11e13ec316b40eae12f6e" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_7436254f477ecbaa760b8d558f0" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_8a026400b2766a1df0d8790535b" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_16c3a260805188fc6bdb85d63df" FOREIGN KEY ("gender_id") REFERENCES "tb_genders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_16c3a260805188fc6bdb85d63df"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_8a026400b2766a1df0d8790535b"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_7436254f477ecbaa760b8d558f0"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP CONSTRAINT "FK_26973d11e13ec316b40eae12f6e"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6dafc292779632e155ff084e5ad"`);
        await queryRunner.query(`DROP TABLE "tb_persons"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "tb_phones"`);
        await queryRunner.query(`DROP TABLE "tb_genders"`);
        await queryRunner.query(`DROP TABLE "tb_addresses"`);
        await queryRunner.query(`DROP TABLE "tb_place_types"`);
        await queryRunner.query(`DROP TABLE "tb_address_types"`);
    }

}
