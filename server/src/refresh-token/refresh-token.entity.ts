import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    refreshToken: string;

    @Column({type: "int", nullable: false, unique: true})
    userId: number;
}