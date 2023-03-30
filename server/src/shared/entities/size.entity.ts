import { ApiHideProperty } from '@nestjs/swagger';

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

	@ApiHideProperty()
	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[];

	@ApiHideProperty()
	@ManyToOne(() => CategoryEntity, (category) => category.sizes)
	category: CategoryEntity;
}
