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

	@OneToMany(() => ProductEntity, (product) => product.subcategory)
	products: ProductEntity[];

	@ManyToOne(() => CategoryEntity, (category) => category.subcategories)
	category: CategoryEntity;
}
