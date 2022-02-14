import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";
import { Product } from "./product.entity";


@Entity()
export class Subcategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    value: string;


    @Column({type: "varchar", nullable: false})
    description: string;

    @ManyToOne(() => Category, category => category.subcategories, {nullable: false})
    category: Category;

    @OneToMany(() => Product, product => product.subcategory)
    products: Product[]
}