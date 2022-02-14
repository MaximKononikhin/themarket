import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class Condition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    value: string;

    @Column({type: "varchar", nullable: false, unique: true})
    description: string;

    @OneToMany(() => Product, product => product.condition)
    products: Product[]
}