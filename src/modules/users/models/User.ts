import DomainUUID from "@modules/domain/models/DomainUUID";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { UserRolesEnum } from "./enum/UserRolesEnum";
import Person from "./Person";
import { RefreshToken } from "./RefreshToken";

@Entity('tb_users')
class User extends DomainUUID {

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: UserRolesEnum.default })
    role: string;

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refresh_tokens: RefreshToken[];

    @OneToOne(() => Person, person => person.user, {
        cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

}

export default User;