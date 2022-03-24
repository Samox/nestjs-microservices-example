import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 5000,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.listen(() => {
    console.log('void');
  });

  console.log('Microservice is listening');
}
bootstrap();
