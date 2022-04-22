import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne } from "typeorm";
import Card from "../Card/Card";
import Domain from "../Domain";
import { UserRolesEnum } from "./enum/UserRolesEnum";
import Person from "./Person";
import { RefreshToken } from "./RefreshToken";

@Entity('tb_users')
class User extends Domain {

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column({default: UserRolesEnum.default})
    role: string;

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refresh_tokens: RefreshToken[];

    @OneToOne(() => Person, person => person.user, { cascade: true, eager: true})
    person: Person;

}

export default User;