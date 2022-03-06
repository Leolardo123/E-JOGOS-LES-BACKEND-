import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCascadingRelations1646595125336 implements MigrationInterface {
    name = 'fixCascadingRelations1646595125336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_8a026400b2766a1df0d8790535b"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "REL_8a026400b2766a1df0d8790535"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "UQ_d3ca6e129b8b4a99fb2306b0638" UNIQUE ("person_id")`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_d3ca6e129b8b4a99fb2306b0638" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_d3ca6e129b8b4a99fb2306b0638"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "UQ_d3ca6e129b8b4a99fb2306b0638"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "address_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "REL_8a026400b2766a1df0d8790535" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_8a026400b2766a1df0d8790535b" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
