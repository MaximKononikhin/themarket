import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryEntity } from '@shared/entities/category.entity';
import { ConditionEntity } from '@shared/entities/condition.entity';
import { GenderEntity } from '@shared/entities/gender.entity';
import { SizeEntity } from '@shared/entities/size.entity';
import { SubcategoryEntity } from '@shared/entities/subcategory.entity';

import { DictionaryService } from '../service/dictionary.service';

@ApiTags('Пол, категории, подкатегории, размеры и тд')
@Controller('dictionary')
export class DictionaryController {
	constructor(private readonly dictionaryService: DictionaryService) {}

	@ApiOperation({ summary: 'Получение полов' })
	@ApiOkResponse({ type: GenderEntity, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get('genders')
	async getGenders() {
		return await this.dictionaryService.getGenders();
	}

	@ApiOperation({ summary: 'Получение категорий' })
	@ApiOkResponse({ type: CategoryEntity, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get('categories/:genderId')
	async getCategories(
		@Param(
			'genderId',
			new ParseIntPipe({
				errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
			}),
		)
		genderId: number,
	) {
		return await this.dictionaryService.getCategories(genderId);
	}

	@ApiOperation({ summary: 'Получение подкатегорий' })
	@ApiOkResponse({ type: SubcategoryEntity, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get('subcategories/:categoryId')
	async getSubcategories(
		@Param(
			'categoryId',
			new ParseIntPipe({
				errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
			}),
		)
		categoryId: number,
	) {
		return await this.dictionaryService.getSubcategories(categoryId);
	}

	@ApiOperation({ summary: 'Получение состояниий вещи' })
	@ApiOkResponse({ type: ConditionEntity, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get('conditions/:genderId')
	async getConditions(
		@Param(
			'genderId',
			new ParseIntPipe({
				errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
			}),
		)
		genderId: number,
	) {
		return await this.dictionaryService.getConditions(genderId);
	}

	@ApiOperation({ summary: 'Получение размеров' })
	@ApiOkResponse({ type: SizeEntity, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get('sizes/:categoryId')
	async getSizes(
		@Param(
			'categoryId',
			new ParseIntPipe({
				errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
			}),
		)
		categoryId: number,
	) {
		return await this.dictionaryService.getSizes(categoryId);
	}
}
