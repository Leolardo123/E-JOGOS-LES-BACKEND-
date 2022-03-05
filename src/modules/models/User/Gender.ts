import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tb_genders')
class Gender {

    @PrimaryColumn()
    readonly id: number;
    
    @Column()
    name: string;

}

export default Gender;