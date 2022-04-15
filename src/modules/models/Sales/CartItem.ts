import AppError from "@shared/errors/AppError";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import Domain from "../Domain";
import Product from "../Products/Product";
import Cart from "./Cart";

@Entity('tb_carts_items')
@Unique(['cart_id', 'product_id'])
export default class CartItem extends Domain {

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    cart_id: string;
    
    @Column()
    product_id: string;

    @JoinColumn({ name: 'cart_id' })
    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart: Cart;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne(() => Product, {
        eager: true,
    })
    product: Product;
    
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        if (this.quantity < 1) {
            throw new AppError('Quantidade deve ser maior que zero');
        }
    }
}