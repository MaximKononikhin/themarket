import { ApiHideProperty } from '@nestjs/swagger';

import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { GenderEntity } from './gender.entity';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';
import { SubcategoryEntity } from './subcategory.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	translation: string;

	@ApiHideProperty()
	@OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
	subcategories: SubcategoryEntity[];

	@ApiHideProperty()
	@OneToMany(() => SizeEntity, (size) => size.category)
	sizes: SizeEntity[];

	@ApiHideProperty()
	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[];

	@ApiHideProperty()
	@ManyToOne(() => GenderEntity, (gender) => gender.categories)
	gender: GenderEntity;
}
