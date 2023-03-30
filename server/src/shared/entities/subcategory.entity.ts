import { ApiHideProperty } from '@nestjs/swagger';

import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductEntity } from '@shared/entities/product.entity';

import { CategoryEntity } from './category.entity';

@Entity({ name: 'subcategory' })
export class SubcategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	translation: string;

	@ApiHideProperty()
	@OneToMany(() => ProductEntity, (product) => product.subcategory)
	products: ProductEntity[];

	@ApiHideProperty()
	@ManyToOne(() => CategoryEntity, (category) => category.subcategories)
	category: CategoryEntity;
}
