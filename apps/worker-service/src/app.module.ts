import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { KillDragonHandler } from './command/kill-dragon.handler';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule],
  controllers: [AppController],
  providers: [
    KillDragonHandler,
    {
      provide: 'API_SERVICE',
      useFactory: (configService: ConfigService) => {
        const inspectServicePort = configService.get(
          'INSPECT_MICROSERVICE_PORT',
        );
        const inspectServiceHost = configService.get(
          'INSPECT_MICROSERVICE_HOST',
        );
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: inspectServicePort,
            host: inspectServiceHost,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
