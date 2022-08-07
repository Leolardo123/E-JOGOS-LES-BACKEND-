import { PrimaryGeneratedColumn } from "typeorm";

class DomainNumber {
    @PrimaryGeneratedColumn()
    readonly id: number;
}

export default DomainNumber;