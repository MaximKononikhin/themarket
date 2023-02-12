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
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiNoContentResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

import { GetUser } from '@shared/decorators/get-user.decorator';
import UserEntity from '@shared/entities/user.entity';
import { UserService } from '@user/service/user.service';
import { CookieAuthenticationGuard } from '@auth/guards/cookie-authentication.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(CookieAuthenticationGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Обновление информации пользователя' })
	@ApiNoContentResponse()
	@HttpCode(HttpStatus.NO_CONTENT)
	@Put()
	async updateOne(@Body() user: UserEntity, @GetUser('id') id: number) {
		await this.userService.updateOne(id, user);
	}

	@ApiOperation({ summary: 'Загрузка автара пользователя' })
	@ApiImplicitFile({ name: 'avatar' })
	@ApiNoContentResponse()
	@ApiInternalServerErrorResponse({
		description: 'Произошла ошибка при записи файл',
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('avatar')
	@UseInterceptors(FileInterceptor('avatar'))
	async uploadAvatar(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
			}),
		)
		avatar: Express.Multer.File,
		@GetUser('id') id: number,
	) {
		await this.userService.uploadAvatar(id, avatar);
	}

	@ApiOperation({ summary: 'Удаление автара пользователя' })
	@ApiNoContentResponse()
	@ApiInternalServerErrorResponse({
		description: 'Произошла ошибка при удалении файл',
	})
	@ApiBadRequestResponse({ description: 'У пользователя нет аватара' })
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('avatar')
	async deleteAvatar(@GetUser('id') id: number) {
		await this.userService.deleteAvatar(id);
	}
}
