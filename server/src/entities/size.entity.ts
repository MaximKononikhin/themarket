import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";
import { Product } from "./product.entity";


@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    us: string;


    @Column({type: "varchar", nullable: true})
    eur: string;

    @ManyToOne(() => Category, category => category.sizes, {nullable: false})
    category: Category;

    @OneToMany(() => Product, product => product.size)
    products: Product[];
}