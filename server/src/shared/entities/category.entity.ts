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

	@OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
	subcategories: SubcategoryEntity[];

	@OneToMany(() => SizeEntity, (size) => size.category)
	sizes: SizeEntity[];

	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[];

	@ManyToOne(() => GenderEntity, (gender) => gender.categories)
	gender: GenderEntity;
}
