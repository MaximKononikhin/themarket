import { ApiHideProperty } from '@nestjs/swagger';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { ConditionEntity } from './condition.entity';
import { ProductEntity } from './product.entity';

export enum GenderName {
	MAN = 'Мужской',
	WOMAN = 'Женский',
}

export enum GenderTranslation {
	MAN = 'man',
	WOMAN = 'woman',
}

@Entity({ name: 'gender' })
export class GenderEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, enum: GenderName })
	name: GenderName;

	@Column({ unique: true, enum: GenderTranslation })
	translation: GenderTranslation;

	@ApiHideProperty()
	@OneToMany(() => CategoryEntity, (category) => category.gender)
	categories: CategoryEntity[];

	@ApiHideProperty()
	@OneToMany(() => ConditionEntity, (condition) => condition.gender)
	conditions: ConditionEntity[];

	@ApiHideProperty()
	@OneToMany(() => ProductEntity, (product) => product.gender)
	products: ProductEntity[];
}
