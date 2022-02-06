import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Gender } from "./gender.entity";


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
}