import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";


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
}