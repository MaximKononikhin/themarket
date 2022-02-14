import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid'
import {InternalException} from "../exceptions/internal.exception";

@Injectable()
export class S3Service {
    private readonly s3 = new S3();

    async uploadFile(dataBuffer: Buffer, filename: string) {
        try {
            const uploadResult = await this.s3.upload({
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Body: dataBuffer,
                Key: `${uuid()}-${filename}`
            }).promise();
            return uploadResult;
        } catch (e) {
            console.log(e);
            throw new InternalException("Внутренняя ошибка сервера");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.s3.deleteObject({
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Key: fileId
            }).promise();
        } catch (e) {
            console.log(e);
            throw new InternalException("Внутренняя ошибка сервера");
        }
    }
}
