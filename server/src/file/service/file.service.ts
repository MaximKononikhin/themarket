import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
	async createFile(file: Express.Multer.File): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(__dirname, '../../static');

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer);
			return fileName;
		} catch (e) {
			throw new InternalServerErrorException(
				'Произошла ошибка при записи файла',
			);
		}
	}

	async deleteFile(fileName: string): Promise<void> {
		try {
			const filePath = path.resolve(__dirname, '../../static');

			if (!fs.existsSync(filePath)) {
				throw new InternalServerErrorException(
					'Произошла ошибка при удалении файла',
				);
			}
			fs.unlinkSync(path.join(filePath, fileName));
		} catch (e) {
			throw new InternalServerErrorException(
				'Произошла ошибка при удалении файла',
			);
		}
	}
}
