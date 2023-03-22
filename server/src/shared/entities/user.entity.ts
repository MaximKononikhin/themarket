import { ApiHideProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public email: string;

	@Column()
	public name: string;

	@Column()
	@ApiHideProperty()
	@Exclude()
	public password: string;

	@Column({ nullable: true })
	public avatar: string | null;

	@BeforeInsert()
	emailToLowerCase() {
		this.email = this.email.toLowerCase();
	}
}

export default UserEntity;
