import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCascadePersonAddress1650661234571 implements MigrationInterface {
    name = 'fixCascadePersonAddress1650661234571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" DROP CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7"`);
        await queryRunner.query(`ALTER TABLE "tb_person_addresses" ADD CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
