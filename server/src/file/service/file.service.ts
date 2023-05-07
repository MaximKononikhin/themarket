import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as fsSync from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

import { STATIC_URL } from '@shared/constants/static';

@Injectable()
export class FileService {
	async createFile(file: Express.Multer.File): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(__dirname, '../../static');

			const isPathExist = fsSync.existsSync(filePath);

			if (!isPathExist) {
				await fs.mkdir(filePath, { recursive: true });
			}
			await fs.writeFile(path.join(filePath, fileName), file.buffer);
			return STATIC_URL + fileName;
		} catch (e) {
			throw new InternalServerErrorException(
				'Произошла ошибка при записи файла',
			);
		}
	}

	async deleteFile(fileName: string): Promise<void> {
		try {
			const filePath = path.resolve(__dirname, '../../static');

			if (!fsSync.existsSync(filePath)) {
				throw new InternalServerErrorException(
					'Произошла ошибка при удалении файла',
				);
			}
			await fs.unlink(path.join(filePath, fileName));
		} catch (e) {
			throw new InternalServerErrorException(
				'Произошла ошибка при удалении файла',
			);
		}
	}
}
