import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	HttpStatus,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

import { GetUser } from '@shared/decorators/get-user.decorator';
import { ProductEntity } from '@shared/entities/product.entity';
import { User } from '@user/models/user.interface';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';

import { CreateProductDto } from '../models/create-product.dto';
import { ProductService } from '../service/product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: 'Создание товара' })
	@ApiResponse({ status: HttpStatus.OK, type: ProductEntity })
	@ApiBody({ type: CreateProductDto })
	@Post()
	@UseGuards(CookieAuthenticationGuard)
	async create(@Body() dto: CreateProductDto, @GetUser() user: User) {
		return await this.productService.create(dto, user);
	}

	@ApiOperation({ summary: 'Загрузка фотографий товара' })
	@ApiResponse({ status: HttpStatus.OK, type: Array<string> })
	@ApiImplicitFile({ name: 'photos' })
	@Post('photos')
	@UseInterceptors(FilesInterceptor('photos'))
	@UseGuards(CookieAuthenticationGuard)
	async uploadFiles(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
			}),
		)
		files: Express.Multer.File[],
	) {
		return await this.productService.uploadPhotos(files);
	}

	@ApiOperation({ summary: 'Получение товаров' })
	@ApiResponse({ status: HttpStatus.OK, type: ProductEntity, isArray: true })
	@Get()
	async getAll() {
		return await this.productService.getAll();
	}
}
