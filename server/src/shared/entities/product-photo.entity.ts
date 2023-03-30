import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity({ name: 'product_photo' })
export class ProductPhotoEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	url: string;

	@Column({ default: false })
	isMain: boolean;

	@ManyToOne(() => ProductEntity, (product) => product.photos)
	product: ProductEntity;
}
