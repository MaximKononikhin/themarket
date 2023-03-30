import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CategoryEntity } from '@shared/entities/category.entity';
import { ConditionEntity } from '@shared/entities/condition.entity';
import { GenderEntity } from '@shared/entities/gender.entity';
import { SizeEntity } from '@shared/entities/size.entity';
import { SubcategoryEntity } from '@shared/entities/subcategory.entity';

@Injectable()
export class DictionaryService {
	constructor(
		@InjectRepository(GenderEntity)
		private readonly genderRepository: Repository<GenderEntity>,
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>,
		@InjectRepository(SubcategoryEntity)
		private readonly subcategoryRepository: Repository<SubcategoryEntity>,
		@InjectRepository(ConditionEntity)
		private readonly conditionRepository: Repository<ConditionEntity>,
		@InjectRepository(SizeEntity)
		private readonly sizeRepository: Repository<SizeEntity>,
	) {}

	async getGenders() {
		return await this.genderRepository.find();
	}

	async getCategories(id: number) {
		return await this.categoryRepository.find({
			where: { gender: { id } },
		});
	}

	async getSubcategories(id: number) {
		return await this.subcategoryRepository.find({
			where: { category: { id } },
		});
	}

	async getConditions(id: number) {
		return await this.conditionRepository.find({
			where: { gender: { id } },
		});
	}

	async getSizes(id: number) {
		return await this.sizeRepository.find({
			where: { category: { id } },
		});
	}
}
