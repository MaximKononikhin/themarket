import { Injectable } from '@nestjs/common';

import { User } from '@user/models/user.interface';

import { CreateProductDto } from '../models/create-product.dto';
import { CreateProductTransaction } from '../utils/create-product-transaction';

@Injectable()
export class ProductService {
	constructor(
		private readonly createProductTransaction: CreateProductTransaction,
	) {}

	async create(dto: CreateProductDto, user: User) {
		return await this.createProductTransaction.run({
			productDto: dto,
			user,
		});
	}
}
