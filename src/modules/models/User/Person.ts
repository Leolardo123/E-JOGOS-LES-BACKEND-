import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Address from "../Address/Address";
import Gender from "./Gender";
import Phone from "./Phone";
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
    birth_date: Date;

    @Column()
    gender_id: number;

    @Column()
    address_id: string;

    @JoinColumn({name:'address_id'})
    @OneToOne(() => Address)
    address: Address;

    @JoinColumn({name:'gender_id'})
    @OneToOne(() => Gender)
    gender: Gender;

    @OneToMany(() => Phone, phone => phone.person)
    phone: Phone[];

    @OneToOne(() => User , user => user.person)
    user: User;

}

export default Person;