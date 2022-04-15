import AppError from "@shared/errors/AppError";
import { Expose } from "class-transformer";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import Domain from "../Domain";
import { validateProduct } from "./validations/ProductValidation";

@Entity("tb_products")
export default class Product extends Domain{

    @Column({ default: true })
    isActive: boolean;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    stock: number;

    @Column()
    requirements: string;
    
    @Column()
    publisher: string;

    @Column()
    developer: string;

    @Column()
    guarantee: string;

    @Column()
    language: string;

    @Column()
    subtitle: string;

    @Column()
    release_date: string;

    @Column()
    recomended_age: number;

    @Column()
    players_offline: number;

    @Column()
    players_online: number;

    @Column()
    resolution: string;

    @Column()
    image: string;

    @BeforeInsert()
    @BeforeUpdate()
    validate(): void {
        validateProduct(this);
    }

    @Expose({ name: 'image_url' })
    getImage(): string {
        return `http://localhost:3333/files/${this.image}`;
    }
}