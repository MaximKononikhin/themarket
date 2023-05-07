import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '@shared/entities/product.entity';
import { FileModule } from '@file/file.module';

import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { CreateProductTransaction } from './utils/create-product-transaction';

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity]), FileModule],
	controllers: [ProductController],
	providers: [
		ProductService,
		{
			provide: CreateProductTransaction,
			useClass: CreateProductTransaction,
		},
	],
})
export class ProductModule {}
