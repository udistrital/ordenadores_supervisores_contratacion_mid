import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Accedemos al ConfigService para obtener las configuraciones desde el .env
  const configService = app.get(ConfigService);

  // Obtenemos el puerto desde el archivo .env o usamos 3000 por defecto
  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
