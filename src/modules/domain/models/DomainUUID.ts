import { PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

class DomainUUID {
    constructor() {
        if (!this.id) {
            this.id = v4();
        }
    }

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;
}

export default DomainUUID;