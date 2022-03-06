import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1646594337858 implements MigrationInterface {
    name = 'createDatabase1646594337858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_addresses_types" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_aae6705201c6fc0f9e792bd101b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_places_types" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_c53e8458e5e67a3ea19fb918119" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_addresses" ("id" uuid NOT NULL, "cep" character varying NOT NULL, "number" integer NOT NULL, "address_type_id" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying, "neighborhood" character varying NOT NULL, "place" character varying NOT NULL, "place_type_id" integer NOT NULL, CONSTRAINT "PK_86c23d37552ae8e71ecbcfd46d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_phones" ("id" uuid NOT NULL, "number" character varying NOT NULL, "ddd" integer NOT NULL, "person_id" uuid NOT NULL, CONSTRAINT "REL_26973d11e13ec316b40eae12f6" UNIQUE ("person_id"), CONSTRAINT "PK_91419dd4de201e2b2eb80a9faf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL, "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_in" integer NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "person_id" uuid NOT NULL, CONSTRAINT "REL_7436254f477ecbaa760b8d558f" UNIQUE ("person_id"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_persons" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "gender_id" integer NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "REL_8a026400b2766a1df0d8790535" UNIQUE ("address_id"), CONSTRAINT "PK_2af079ba897e0e01ca2ae609e42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_genders" ("id" integer NOT NULL, "name" character varying NOT NULL, "personsId" uuid, CONSTRAINT "PK_ad4433ee86ecc6885a91b560532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY ("address_type_id") REFERENCES "tb_addresses_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY ("place_type_id") REFERENCES "tb_places_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD CONSTRAINT "FK_26973d11e13ec316b40eae12f6e" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_7436254f477ecbaa760b8d558f0" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_8a026400b2766a1df0d8790535b" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_genders" ADD CONSTRAINT "FK_91f282ce53f7a991adfae356acb" FOREIGN KEY ("personsId") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_genders" DROP CONSTRAINT "FK_91f282ce53f7a991adfae356acb"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_8a026400b2766a1df0d8790535b"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_7436254f477ecbaa760b8d558f0"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP CONSTRAINT "FK_26973d11e13ec316b40eae12f6e"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6dafc292779632e155ff084e5ad"`);
        await queryRunner.query(`DROP TABLE "tb_genders"`);
        await queryRunner.query(`DROP TABLE "tb_persons"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "tb_phones"`);
        await queryRunner.query(`DROP TABLE "tb_addresses"`);
        await queryRunner.query(`DROP TABLE "tb_places_types"`);
        await queryRunner.query(`DROP TABLE "tb_addresses_types"`);
    }

}
