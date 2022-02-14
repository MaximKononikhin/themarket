import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import File from "../entities/file.entity";
import {Repository} from "typeorm";
import { S3Service } from 'src/s3/s3.service';
import { InternalException } from 'src/exceptions/internal.exception';

@Injectable()
export class FileService {
    constructor(
                @InjectRepository(File) private fileRepository: Repository<File>,
                private s3Service: S3Service,
                ) {}

    async uploadFile(dataBuffer: Buffer, filename: string) {
        try {
            const uploadResult = await this.s3Service.uploadFile(dataBuffer, filename);
            const newFile = this.fileRepository.create({
                key: uploadResult.Key,
                url: uploadResult.Location
            });
            await this.fileRepository.save(newFile);
            return newFile;
        } catch (e) {
            console.log(e);
            throw new InternalException("Внутренняя ошибка сервера");
        }
    }

    async deleteFile(fileId) {
        try {
            const file = await this.fileRepository.findOne({where: {id: fileId}});
            await this.s3Service.deleteFile(file.id);
            await this.fileRepository.delete(fileId);
        } catch (e) {
            console.log(e);
            throw new InternalException("Внутренняя ошибка сервера");
        }
    }
}
