import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '@shared/entities/product.entity';

import { ControllerController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { CreateProductTransaction } from './utils/create-product-transaction';

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity])],
	controllers: [ControllerController],
	providers: [
		ProductService,
		{
			provide: CreateProductTransaction,
			useClass: CreateProductTransaction,
		},
	],
})
export class ProductModule {}
