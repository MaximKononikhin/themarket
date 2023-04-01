import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetUser } from '@shared/decorators/get-user.decorator';
import { User } from '@user/models/user.interface';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';

import { CreateProductDto } from '../models/create-product.dto';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@UseGuards(CookieAuthenticationGuard)
	async create(@Body() dto: CreateProductDto, @GetUser() user: User) {
		return await this.productService.create(dto, user);
	}

	@Get()
	async getAll() {
		return await this.productService.getAll();
	}
}
