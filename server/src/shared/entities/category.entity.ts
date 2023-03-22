import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { GenderEntity } from './gender.entity';
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

	@ManyToOne(() => GenderEntity, (gender) => gender.categories)
	gender: GenderEntity;
}
