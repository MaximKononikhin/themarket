import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public email: string;

	@Column()
	public name: string;
}

export default User;
