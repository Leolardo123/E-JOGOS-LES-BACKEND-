import DomainUUID from "@modules/domain/models/DomainUUID";
import Person from "@modules/users/models/Person";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Card from "./Card";

@Entity('tb_person_cards')
class PersonCard extends DomainUUID {

    @Column('uuid')
    person_id: string;

    @Column('uuid')
    card_id: string;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.cards, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    @JoinColumn({ name: 'card_id' })
    @OneToOne(() => Card, card => card.person_card, {
        cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    card: Card;

}

export default PersonCard;