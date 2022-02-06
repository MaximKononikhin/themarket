import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import File from "../entities/file.entity";

@Module({
  providers: [FileService],
  imports: [
      TypeOrmModule.forFeature([
          File
      ])
  ],
    exports: [FileService]
})
export class FileModule {}
