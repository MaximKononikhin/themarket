import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

class Photo {
	url: string;
	isMain: boolean;
}

export class CreateProductDto {
	@IsString()
	brand: string;

	@IsString()
	model: string;

	@IsNumber()
	price: number;

	@IsString()
	description: string;

	@IsString()
	city: string;

	@IsArray()
	@Type(() => Photo)
	photos: Photo[];

	@IsNumber()
	genderId: number;

	@IsNumber()
	categoryId: number;

	@IsNumber()
	subcategoryId: number;

	@IsNumber()
	sizeId: number;

	@IsNumber()
	conditionId: number;
}
