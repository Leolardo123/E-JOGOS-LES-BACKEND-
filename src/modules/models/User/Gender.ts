import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('tb_genders')
class Gender {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    name: string;

}

export default Gender;