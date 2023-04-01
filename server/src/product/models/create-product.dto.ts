import { IsArray, IsNumber, IsString } from 'class-validator';

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
	photos: {
		url: string;
		isMain: boolean;
	}[];

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
