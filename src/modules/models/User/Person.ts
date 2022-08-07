import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import PersonAddress from "../Address/PersonAddress";
import PersonCard from "../Card/PersonCard";
import Domain from "../Domain";
import Cart from "../Sales/Cart";
import Gender from "./Gender";
import Phone from "./Phone";
import User from "./User";

@Entity('tb_persons')
class Person extends Domain {
    
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

    @OneToMany(() => PersonAddress, address => address.person, { 
        cascade: true, eager: true
    })
    addresses: PersonAddress[];

    @JoinColumn({name:'gender_id'})
    @OneToMany(() => Gender, gender => gender.persons ,{
        cascade:true, onDelete:'RESTRICT', onUpdate: 'CASCADE'
    })
    gender: Gender;

    @OneToMany(() => PersonCard, card => card.person, { 
        cascade: true, eager: true
    })
    cards: PersonCard[];

    @OneToMany(() => Cart, cart => cart.person, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    carts: Cart[];

    @OneToOne(() => Phone, phone => phone.person, { 
        cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    phone: Phone;

    @JoinColumn({name:'user_id'})
    @OneToOne(() => User , user => user.person,{
        onDelete:'CASCADE', onUpdate:'CASCADE'
    })
    user: User;

}

export default Person;