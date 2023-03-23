import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { GenderEntity } from './gender.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'condition' })
export class ConditionEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	name: string;

	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[];

	@ManyToOne(() => GenderEntity, (gender) => gender.conditions)
	gender: GenderEntity;
}
