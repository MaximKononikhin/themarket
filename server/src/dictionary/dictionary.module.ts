import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from '@shared/entities/category.entity';
import { ConditionEntity } from '@shared/entities/condition.entity';
import { GenderEntity } from '@shared/entities/gender.entity';
import { SizeEntity } from '@shared/entities/size.entity';
import { SubcategoryEntity } from '@shared/entities/subcategory.entity';

import { DictionaryController } from './controller/dictionary.controller';
import { DictionaryService } from './service/dictionary.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			GenderEntity,
			CategoryEntity,
			SubcategoryEntity,
			ConditionEntity,
			SizeEntity,
		]),
	],
	providers: [DictionaryService],
	controllers: [DictionaryController],
})
export class DictionaryModule {}
