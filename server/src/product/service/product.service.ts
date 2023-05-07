import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductEntity } from '@shared/entities/product.entity';
import { User } from '@user/models/user.interface';
import { FileService } from '@file/service/file.service';

import { CreateProductDto } from '../models/create-product.dto';
import { CreateProductTransaction } from '../utils/create-product-transaction';

@Injectable()
export class ProductService {
	constructor(
		private readonly createProductTransaction: CreateProductTransaction,
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
		private readonly fileService: FileService,
	) {}

	async create(dto: CreateProductDto, user: User) {
		return await this.createProductTransaction.run({
			productDto: dto,
			user,
		});
	}

	async getAll() {
		return await this.productRepository.find({ relations: ['photos'] });
	}

	async uploadPhotos(files: Express.Multer.File[]) {
		return await Promise.all(
			files.map(async (file) => await this.fileService.createFile(file)),
		);
	}
}
