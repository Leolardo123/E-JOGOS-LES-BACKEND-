import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Gender from "./Gender";
import User from "./User";


@Entity('tb_persons')
class Person {

    @PrimaryColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    cpf: string;

    @Column()
    cellphone: number;

    @Column()
    gender_id: number;

    @Column()
    birth_date: Date;

    @JoinColumn({name:'gender_id'})
    @OneToOne(() => Gender)
    gender: Gender;

    @OneToOne(() => User , user => user.person)
    user: User;

}

export default Person;