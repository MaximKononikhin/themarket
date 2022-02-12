import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Gender } from "./gender.entity";
import { Subcategory } from "./subcategory.entity";
import { Size } from "./size.entity";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    value: string;


    @Column({type: "varchar", nullable: false})
    description: string;

    @ManyToOne(() => Gender, gender => gender.categories, {nullable: false})
    gender: Gender;

    @OneToMany(() => Subcategory, subcategory => subcategory.category)
    subcategories: Subcategory[];

    @OneToMany(() => Size, size => size.category)
    sizes: Size[];
}