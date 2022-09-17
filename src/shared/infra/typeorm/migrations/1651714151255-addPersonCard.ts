import {MigrationInterface, QueryRunner} from "typeorm";

export class addPersonCard1651714151255 implements MigrationInterface {
    name = 'addPersonCard1651714151255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_person_cards" ("id" uuid NOT NULL, "person_id" uuid NOT NULL, "card_id" uuid NOT NULL, CONSTRAINT "REL_005ac2f8d118dcb5df0c68f1f8" UNIQUE ("card_id"), CONSTRAINT "PK_3259e252c7bc69ae63e45c91193" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_person_cards" ADD CONSTRAINT "FK_577fe55230ea110e0ef8abc4382" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_person_cards" ADD CONSTRAINT "FK_005ac2f8d118dcb5df0c68f1f8b" FOREIGN KEY ("card_id") REFERENCES "tb_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_person_cards" DROP CONSTRAINT "FK_005ac2f8d118dcb5df0c68f1f8b"`);
        await queryRunner.query(`ALTER TABLE "tb_person_cards" DROP CONSTRAINT "FK_577fe55230ea110e0ef8abc4382"`);
        await queryRunner.query(`DROP TABLE "tb_person_cards"`);
    }

}
