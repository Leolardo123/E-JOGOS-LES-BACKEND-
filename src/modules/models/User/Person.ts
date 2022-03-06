import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Address from "../Address/Address";
import Gender from "./Gender";
import Phone from "./Phone";
import User from "./User";

@Entity('tb_persons')
class Person {

    @PrimaryColumn('uuid')
    readonly id: string;
    
    @Column()
    name: string;
    
    @Column()
    cpf: string;

    @Column()
    cellphone: string;

    @Column()
    birth_date: Date;

    @Column()
    gender_id: number;

    @Column()
    user_id: string;

    @OneToOne(() => Address, address => address.person)
    address: Address;

    @JoinColumn({name:'gender_id'})
    @OneToMany(() => Gender, gender => gender.persons ,{
        cascade:true
    })
    gender: Gender;

    @OneToOne(() => Phone, phone => phone.person)
    phone: Phone;

    @JoinColumn({name:'user_id'})
    @OneToOne(() => User , user => user.person,{
        onDelete:'CASCADE', onUpdate:'CASCADE'
    })
    user: User;

}

export default Person;