import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';

@Entity({ name: 'subcategory' })
export class SubcategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	translation: string;

	@ManyToOne(() => CategoryEntity, (category) => category.subcategories)
	category: CategoryEntity;
}
