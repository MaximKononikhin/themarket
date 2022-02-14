import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductPhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    url: string;

    @Column({type: "varchar", nullable: false, unique: true})
    key: string;

    @ManyToOne(() => Product, product => product.photos)
    product: Product;
}