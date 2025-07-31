import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export interface TransactionEventExpectedInput {
  senderId: string;
  receiverId: string;
  amount: bigint;
  description?: string;
}

@Injectable()
export class RabbitMQProducerUseCase implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;
  private readonly logger = new Logger(RabbitMQProducerUseCase.name);

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
        queue: 'queue_transactions_create',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async onModuleInit() {
    const maxRetries = 3;
    const retryDelay = 2000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.client.connect();

        this.logger.log('✅ CONECTADO ao RabbitMQ - Clients');

        return;
      } catch (error) {
        this.logger.error(
          `❌ Falha ao conectar no RabbitMQ (tentativa ${attempt}): ${error?.message || error}`,
        );

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));

          this.logger.log('⏳ Tentando novamente...');
        } else {
          this.logger.error(
            '❌ Não foi possível conectar ao RabbitMQ após várias tentativas.',
          );
          throw error;
        }
      }
    }
  }

  async transactionEvent(data: TransactionEventExpectedInput) {
    try {
      const sanitizedData = {
        ...data,
        amount: data.amount.toString(),
      };

      this.logger.log('📤 ENVIANDO evento de transação:', sanitizedData);

      await this.client.emit('', sanitizedData).toPromise();

      this.logger.log('✅ Evento ENVIADO com sucesso!');
    } catch (error) {
      this.logger.error('❌ ERRO ao enviar evento:', error);
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
