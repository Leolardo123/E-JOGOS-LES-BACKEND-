import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import PersonAddress from "../Address/PersonAddress";
import Card from "../Card/Card";
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

    @OneToMany(() => PersonAddress, address => address.person, { cascade: true, eager: true })
    addresses: PersonAddress[];

    @JoinColumn({name:'gender_id'})
    @OneToMany(() => Gender, gender => gender.persons ,{
        cascade:true
    })
    gender: Gender;

    @OneToMany(() => Card, card => card.user, { cascade: true, eager: true, orphanedRowAction: 'delete'})
    cards: Card[];

    @OneToMany(() => Cart, cart => cart.person)
    carts: Cart[];

    @OneToOne(() => Phone, phone => phone.person, { cascade: true, eager: true })
    phone: Phone;

    @JoinColumn({name:'user_id'})
    @OneToOne(() => User , user => user.person,{
        onDelete:'CASCADE', onUpdate:'CASCADE'
    })
    user: User;

}

export default Person;