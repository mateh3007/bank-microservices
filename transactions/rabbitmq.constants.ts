export const RABBITMQ_OPTIONS = {
  urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
  queueTransactions: 'transactions_queue',
  exchangeTransactions: 'transactions_exchange',
  routingKeyCreated: 'transaction.created',
};
