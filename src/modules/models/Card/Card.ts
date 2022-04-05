import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Domain from "../Domain";
import Brand from "../Brand/Brand";
import User from "../User/User";

@Entity('tb_cards')
class Card extends Domain {
    
    @Column()
    owner_name: string;
    
    @Column()
    number: string;
    
    @Column()
    brand_id: string;

    @Column()
    user_id: string;
    
    @Column()
    security_code: string;

    @JoinColumn({name:'bandeira_id'})
    @ManyToOne(() => Brand, {
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    brand: Brand;

    @JoinColumn({name:'user_id'})
    @ManyToOne(() => User, {
        onDelete:'CASCADE',onUpdate:'CASCADE'
    })
    user: User;
    
}

export default Card;