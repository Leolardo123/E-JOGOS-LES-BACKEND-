import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAddressPersonToMultiple1647121363536 implements MigrationInterface {
    name = 'changeAddressPersonToMultiple1647121363536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_d3ca6e129b8b4a99fb2306b0638"`);
        await queryRunner.query(`CREATE TABLE "tb_person_addresses" ("id" uuid NOT NULL, "person_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "REL_a78b61626faf2959ca29a81a1f" UNIQUE ("address_id"), CONSTRAINT "PK_407b70f79c3a8e88a5f79713299" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "UQ_d3ca6e129b8b4a99fb2306b0638"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "UQ_d3ca6e129b8b4a99fb2306b0638" UNIQUE ("person_id")`);
        await queryRunner.query(`DROP TABLE "tb_person_addresses"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_d3ca6e129b8b4a99fb2306b0638" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
