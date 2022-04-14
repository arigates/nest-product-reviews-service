import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const user = config.get('RABBITMQ_USER');
  const password = config.get('RABBITMQ_PASSWORD');
  const host = config.get('RABBITMQ_HOST');
  const queueName = config.get('RABBITMQ_PRODUCT_QUEUE_NAME');
  const vHost = config.get('RABBITMQ_VHOST');

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}${vHost}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(config.get('PORT'));
}
bootstrap();
