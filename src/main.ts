import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useSwagger(app);
  await app.listen(3000);

  function useSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Pumpkin NestJS API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
    console.log('APP START IN ' + process.env.NODE_ENV);
  }
}

bootstrap();
