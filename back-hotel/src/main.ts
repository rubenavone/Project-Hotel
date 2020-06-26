import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Swagger begin
   */
  const options = new DocumentBuilder()
    .setTitle('Hotel Paradise')
    .setDescription("Back End de l'application Hotel paradise")
    .setVersion('0.2.0')
    .addTag('Hotel Paradise')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  /**
   * Swagger End
   */
  await app.listen(8000);
}
bootstrap();
