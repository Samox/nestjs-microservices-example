import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KillDragonCommand } from './kill-dragon.command';

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  async execute(command: KillDragonCommand) {
    const { heroId, dragonId } = command;
    console.log(`Hello ${heroId} ${dragonId}`);
    return `Hello ${heroId}`;
  }
}
