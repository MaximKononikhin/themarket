import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Condition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    value: string;


    @Column({type: "varchar", nullable: false, unique: true})
    description: string;
}