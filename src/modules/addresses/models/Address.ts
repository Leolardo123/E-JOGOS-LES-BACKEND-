import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import PersonAddress from "./PersonAddress";
import AddressType from "./AddressType";
import PlaceType from "./PlaceType";
import Domain from "../../domain/models/DomainUUID";

@Entity('tb_addresses')
class Address extends Domain {

    @Column()
    cep: string;

    @Column()
    number: number;

    @Column()
    address_type_id: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column({ nullable: true })
    complement?: string;

    @Column()
    neighborhood: string;

    @Column()
    place: string;

    @Column()
    place_type_id: number;

    @JoinColumn({ name: 'address_type_id' })
    @ManyToOne(() => AddressType, atype => atype.address, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    address_type: AddressType;

    @JoinColumn({ name: 'place_type_id' })
    @ManyToOne(() => PlaceType, ptype => ptype.address, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    place_type: PlaceType;

    @OneToOne(() => PersonAddress, personAddress => personAddress.address, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person_address: PersonAddress;
}

export default Address;