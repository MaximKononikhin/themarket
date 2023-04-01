import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@shared/entities/product.entity';
import { ProductPhotoEntity } from '@shared/entities/product-photo.entity';
import { User } from '@user/models/user.interface';

import { BaseTransaction } from '../../database/utils/base-transaction';
import { CreateProductDto } from '../models/create-product.dto';

@Injectable()
export class CreateProductTransaction extends BaseTransaction<
	{ productDto: CreateProductDto; user: User },
	ProductEntity
> {
	async execute(
		data: { productDto: CreateProductDto; user: User },
		manager,
	): Promise<ProductEntity> {
		let photos: ProductPhotoEntity[] = [];

		if (data.productDto.photos.length > 0) {
			photos = manager.create(ProductPhotoEntity, data.productDto.photos);

			await manager.save(ProductPhotoEntity, photos);
		}

		const product = manager.create(ProductEntity, {
			...data,
			user: { id: data.user.id },
			photos,
			gender: { id: data.productDto.genderId },
			category: { id: data.productDto.categoryId },
			subcategory: { id: data.productDto.subcategoryId },
			condition: { id: data.productDto.conditionId },
			size: { id: data.productDto.sizeId },
		});

		await manager.save(ProductEntity, product);

		return product;
	}
}
