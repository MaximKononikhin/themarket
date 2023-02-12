import {
	Body,
	Controller,
	Delete,
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

import { GetUser } from '@shared/decorators/get-user.decorator';
import UserEntity from '@shared/entities/user.entity';
import { UserService } from '@user/service/user.service';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';
import { FileService } from '@file/service/file.service';

@Controller('user')
@UseGuards(CookieAuthenticationGuard)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly fileService: FileService,
	) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Put()
	async updateOne(@Body() user: UserEntity, @GetUser('id') id: number) {
		await this.userService.updateOne(id, user);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('avatar')
	@UseInterceptors(FileInterceptor('avatar'))
	async uploadAvatar(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
			}),
		)
		file: Express.Multer.File,
		@GetUser('id') id: number,
	) {
		await this.userService.uploadAvatar(id, file);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('avatar')
	async deleteAvatar(@GetUser('id') id: number) {
		await this.userService.deleteAvatar(id);
	}
}
