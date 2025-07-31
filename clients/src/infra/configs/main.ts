import { NestFactory } from '@nestjs/core';
import { ValidationPipeConfig } from './validation-pipe';
import { AppModule } from '../modules/app/app.module';
import { SwaggerConfig } from './swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(ValidationPipeConfig.config());
  app.setGlobalPrefix('api/v1');
  SwaggerConfig.config(app);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
      queue: 'queue_transactions_processed',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
