import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionariesService } from './dictionaries.service';
import { DictionariesController } from './dictionaries.controller';
import { Gender } from 'src/entities/gender.entity';
import { Category } from 'src/entities/category.entity';
import { Subcategory } from 'src/entities/subcategory.entity';
import { Size } from 'src/entities/size.entity';

@Module({
  providers: [DictionariesService],
  controllers: [DictionariesController],
  imports: [
    TypeOrmModule.forFeature([
        Gender,
        Category,
        Subcategory,
        Size,
    ])
  ]
})
export class DictionariesModule {}
