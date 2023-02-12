import {
	Body,
	Controller,
	FileTypeValidator,
	HttpCode,
	HttpStatus,
	ParseFilePipe,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { parse } from 'path';
import { v4 as uuid } from 'uuid';

import { GetUser } from '@shared/decorators/get-user.decorator';
import UserEntity from '@shared/entities/user.entity';
import { UserService } from '@user/service/user.service';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';

@Controller('user')
@UseGuards(CookieAuthenticationGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Put()
	async updateOne(@Body() user: UserEntity, @GetUser('id') id: number) {
		await this.userService.updateOne(id, user);
	}

	@HttpCode(HttpStatus.OK)
	@Post('avatar')
	@UseInterceptors(
		FileInterceptor('avatar', {
			storage: diskStorage({
				destination: './uploads/avatars',
				filename: (req, file, callback) => {
					const filename =
						parse(file.originalname).name.replace(/\s/g, '') +
						uuid();
					const extension = parse(file.originalname).ext;
					callback(null, `${filename}${extension}`);
				},
			}),
		}),
	)
	async uploadAvatar(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
			}),
		)
		file,
		@GetUser('id') id: number,
	) {
		console.log(file);
		return { imagePath: file.path };
	}
}
