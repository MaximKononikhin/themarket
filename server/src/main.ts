import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./pipes/validation.pipe";
import * as cookieParser from "cookie-parser";
import {config} from "aws-sdk";
import {UnauthorizedExceptionFilter} from "./exceptions/unauthorized-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.enableCors({
    // allowedHeaders:"*",
    origin: "http://localhost:8080",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  await app.listen(3000);
}
bootstrap();
