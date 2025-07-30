import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  static config(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Desafio Node Loomi')
      .setDescription('Documentação da API do desafio Node Loomi')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
}
