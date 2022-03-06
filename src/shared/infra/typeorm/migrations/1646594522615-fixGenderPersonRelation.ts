import {MigrationInterface, QueryRunner} from "typeorm";

export class fixGenderPersonRelation1646594522615 implements MigrationInterface {
    name = 'fixGenderPersonRelation1646594522615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_7436254f477ecbaa760b8d558f0"`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_7436254f477ecbaa760b8d558f0" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_7436254f477ecbaa760b8d558f0"`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_7436254f477ecbaa760b8d558f0" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
