import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import File from "../entities/file.entity";
import {Repository} from "typeorm";
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid'
import {InternalException} from "../exceptions/internal.exception";

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>) {
    }

    private readonly s3 = new S3();

    async uploadFile(dataBuffer: Buffer, filename: string) {
        try {
            const uploadResult = await this.s3.upload({
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Body: dataBuffer,
                Key: `${uuid()}-${filename}`
            }).promise();
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
            await this.s3.deleteObject({
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Key: file.key
            }).promise();
            await this.fileRepository.delete(fileId);
        } catch (e) {
            console.log(e);
            throw new InternalException("Внутренняя ошибка сервера");
        }
    }
}
