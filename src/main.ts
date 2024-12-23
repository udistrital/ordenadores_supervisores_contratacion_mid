import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Ordenadores Supervisores API MID')
    .setDescription('API')
    .setVersion('1.0.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //Swagger Saving
  const outputPath = join(process.cwd(), 'swagger');
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(
    join(outputPath, 'swagger.json'),
    JSON.stringify(document, null, 2),
  );
  fs.writeFileSync(join(outputPath, 'swagger.yaml'), yaml.dump(document));

  //Validation
  app.useGlobalPipes(new ValidationPipe());

  //Enable CORS
  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 3010);
}

bootstrap();
