import { NestFactory } from '@nestjs/core';
import { ValidationPipeConfig } from './validation-pipe';
import { AppModule } from '../modules/app/app.module';
import { SwaggerConfig } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(ValidationPipeConfig.config());
  app.setGlobalPrefix('api/v1');
  SwaggerConfig.config(app);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
