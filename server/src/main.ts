import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';

import { Session } from '@shared/entities/sesson.entity';
import { TypeOrmExceptionFilter } from '@shared/filters/typeorm-exception-filter.filter';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new TypeOrmExceptionFilter());

	const sessionRepository = app.get(DataSource).getRepository(Session);

	app.use(
		session({
			name: 'themarket_session_id',
			secret: configService.get<string>('SESSION_SECRET'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 60000 * 60 * 24 * 30,
			},
			store: new TypeormStore({
				cleanupLimit: 2,
			}).connect(sessionRepository),
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Themarket API')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(configService.get<string>('PORT'));
}

bootstrap();
