import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    value: string;

    @Column({type: "varchar", nullable: false})
    description: string;

    @OneToMany(() => Category, category => category.gender)
    categories: Category[]
}