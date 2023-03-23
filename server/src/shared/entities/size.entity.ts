import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'size' })
export class SizeEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	name: string;

	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[];

	@ManyToOne(() => CategoryEntity, (category) => category.sizes)
	category: CategoryEntity;
}
