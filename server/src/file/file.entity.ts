import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class File {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    public url: string;

    @Column({type: "varchar", nullable: false, unique: true})
    public key: string;
}

export default File;