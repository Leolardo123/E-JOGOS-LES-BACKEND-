import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Domain from "../../domain/models/DomainUUID";
import PersonCard from "./PersonCard";
import Person from "@modules/users/models/Person";
import Brand from "./Brand";

@Entity('tb_cards')
class Card extends Domain {

    @Column()
    owner_name: string;

    @Column()
    number: string;

    @Column()
    brand_id: string;

    @Column()
    person_id: string;

    @Column()
    security_code: string;

    @JoinColumn({ name: 'brand_id' })
    @ManyToOne(() => Brand, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    brand: Brand;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    @OneToOne(() => PersonCard, personCard => personCard.card, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person_card: PersonCard;

}

export default Card;