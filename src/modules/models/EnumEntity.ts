import { PrimaryGeneratedColumn } from "typeorm";

class EnumEntity {
    @PrimaryGeneratedColumn()
    readonly id:  number;
}

export default EnumEntity;