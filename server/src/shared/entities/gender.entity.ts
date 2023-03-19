import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';

export enum GenderName {
	MAN = 'Мужской',
	WOMAN = 'Женский',
}

export enum GenderTranslation {
	MAN = 'man',
	WOMAN = 'woman',
}

@Entity()
export class GenderEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, enum: GenderName })
	name: GenderName;

	@Column({ unique: true, enum: GenderTranslation })
	translation: GenderTranslation;

	@OneToMany(() => CategoryEntity, (category) => category.gender)
	categories: CategoryEntity[];
}
