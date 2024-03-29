import { ApiHideProperty } from '@nestjs/swagger';

import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { ConditionEntity } from '@shared/entities/condition.entity';
import { ProductPhotoEntity } from '@shared/entities/product-photo.entity';

import { CategoryEntity } from './category.entity';
import { GenderEntity } from './gender.entity';
import { SizeEntity } from './size.entity';
import { SubcategoryEntity } from './subcategory.entity';
import UserEntity from './user.entity';

@Entity({ name: 'product' })
export class ProductEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	public created_at: Date;

	@Column()
	brand: string;

	@Column()
	model: string;

	@Column()
	price: number;

	@Column()
	description: string;

	@Column()
	city: string;

	@OneToMany(() => ProductPhotoEntity, (photo) => photo.product)
	photos: ProductPhotoEntity[];

	@ManyToOne(() => UserEntity, (user) => user.products)
	user: UserEntity;

	@ApiHideProperty()
	@ManyToOne(() => GenderEntity, (gender) => gender.products)
	gender: GenderEntity;

	@ApiHideProperty()
	@ManyToOne(() => CategoryEntity, (category) => category.products)
	category: CategoryEntity;

	@ApiHideProperty()
	@ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.products)
	subcategory: SubcategoryEntity;

	@ManyToOne(() => SizeEntity, (size) => size.products)
	size: SizeEntity;

	@ManyToOne(() => ConditionEntity, (condition) => condition.products)
	condition: ConditionEntity;
}
