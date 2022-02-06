import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./role.entity";
import File from "./file.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column({type: "varchar", nullable: false})
    name: string;

    @JoinColumn()
    @OneToOne(() => File, { eager: true, nullable: true, onDelete: "SET NULL", cascade: true })
    public avatar?: File;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[]
}