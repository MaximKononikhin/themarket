import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";


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
}