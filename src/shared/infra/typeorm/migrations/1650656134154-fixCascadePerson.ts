import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCascadePerson1650656134154 implements MigrationInterface {
    name = 'fixCascadePerson1650656134154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
