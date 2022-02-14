import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import File from "../entities/file.entity";
import { S3Module } from 'src/s3/s3.module';

@Module({
  providers: [FileService],
  imports: [
      TypeOrmModule.forFeature([
          File
      ]),
      S3Module
  ],
    exports: [FileService]
})
export class FileModule {}
