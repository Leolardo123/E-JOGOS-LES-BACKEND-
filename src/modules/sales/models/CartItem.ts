import DomainUUID from "@modules/domain/models/DomainUUID";
import Product from "@modules/products/models/Product";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import Cart from "./Cart";

@Entity('tb_carts_items')
@Unique(['cart_id', 'product_id'])
export default class CartItem extends DomainUUID {

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
        eager: true
    })
    product: Product;

}