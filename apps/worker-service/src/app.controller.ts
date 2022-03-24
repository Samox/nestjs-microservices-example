import { Controller, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { KillDragonCommand } from './command/kill-dragon.command';

@Controller()
export class AppController {
  constructor(
    @Inject('API_SERVICE') private readonly client: ClientProxy,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('start_job')
  async handleMessagePrinted(data: any) {
    console.log('Message received!');
    console.log(data);
    console.log('Processing...');

    this.commandBus.execute(
      new KillDragonCommand('heroId', 'killDragonDto.dragonId'),
    );

    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 1000));
      this.client
        .emit('progress', { progress: `${(i / 5) * 100}%` })
        .toPromise();
      console.log(i);
    }

    console.log('Processing completed, send final message!');
    await this.client
      .emit('result', { msg: 'Processing complete' })
      .toPromise();

    console.log('Message sent!');
  }
}
