import { Controller, Get, Param } from '@nestjs/common';
import { DictionariesService } from './dictionaries.service';

@Controller('dictionaries')
export class DictionariesController {
    constructor(private dictionariesService: DictionariesService) {
    }

    @Get("genders")
    async getGenders() {
        return await this.dictionariesService.getGenders();
    }

    @Get("categories/:genderId")
    async getCategories(@Param("genderId") genderId: number) {
        return await this.dictionariesService.getCategories(genderId)
    }

    @Get("sizes/:categoryId")
    async getSizes(@Param("categoryId") categoryId: number) {
        return await this.dictionariesService.getSizes(categoryId);
    }
}
