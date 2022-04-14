import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Global()
@Module({
  providers: [
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (config: ConfigService) => {
        const user = config.get('RABBITMQ_USER');
        const password = config.get('RABBITMQ_PASSWORD');
        const host = config.get('RABBITMQ_HOST');
        const queueName = config.get('RABBITMQ_PRODUCT_QUEUE_NAME');
        const vHost = config.get('RABBITMQ_VHOST');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}${vHost}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PRODUCT_SERVICE'],
})
export class GlobalModule {}
