import { PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

class Domain {
    constructor(){
        if(!this.id){
            this.id = v4();
        }
    }

    @PrimaryColumn('uuid')
    readonly id: string;
}

export default Domain;