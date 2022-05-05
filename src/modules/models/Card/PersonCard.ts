import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Person from "../User/Person";
import Domain from "../Domain";
import Card from "./Card";

@Entity('tb_person_cards')
class PersonCard extends Domain {

    @Column('uuid')
    person_id: string;
    
    @Column('uuid')
    card_id: string;

    @JoinColumn({name:'person_id'})
    @ManyToOne(() => Person, person => person.cards, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    @JoinColumn({name:'card_id'})
    @OneToOne(() => Card, card => card.person_card, { 
        cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    card: Card;

}

export default PersonCard;