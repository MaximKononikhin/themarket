import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    value: string;

    @Column({type: "varchar", nullable: false})
    description: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[]
}