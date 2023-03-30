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

@Entity({ name: 'condition' })
export class ConditionEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	name: string;

	@ApiHideProperty()
	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[];

	@ApiHideProperty()
	@ManyToOne(() => GenderEntity, (gender) => gender.conditions)
	gender: GenderEntity;
}
