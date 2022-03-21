import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gender } from 'src/entities/gender.entity';
import { Category } from 'src/entities/category.entity';
import { Subcategory } from 'src/entities/subcategory.entity';
import { Size } from 'src/entities/size.entity';

@Injectable()
export class DictionariesService {
    constructor(
        @InjectRepository(Gender) private genderRepository: Repository<Gender>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Subcategory) private subcategoryRepository: Repository<Subcategory>,
        @InjectRepository(Size) private sizeRepository: Repository<Size>,
    ) {
    }

    async getGenders() {
        return await this.genderRepository.find();
    };

    async getCategories(genderId: number) {
        const gender = await this.genderRepository.findOne({ where : { id: genderId } });
        return await this.categoryRepository.find({ where: { gender } })
    }

    async getSubcategories(categoryId: number) {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        return await this.subcategoryRepository.find({ where: { category } });
    }

    async getSizes(categoryId: number) {
        const category = await this.categoryRepository.findOne({where: {id: categoryId}});
        return await this.sizeRepository.find({ where: { category } });
    }
}
