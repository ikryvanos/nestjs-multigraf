import { BotOptions, Context, Multigraf } from '../lib/multigraf';
import { INestMicroservice } from '@nestjs/common';
import { MultigrafTransport } from './multigraf-transport';
import { LaunchOptions } from '../lib/multigraf';
import { NestFactory } from '@nestjs/core';
import { session } from 'telegraf';
import { NestMultigrafModule } from './nestjs-multigraf.module';

export type MultigrafOptions = {
  session: boolean | {}; // TODO: add session settings
};

export class NestMultigrafAppFactory<TContext extends Context = Context> {
  private readonly multigraf: Multigraf;

  constructor(bots: BotOptions[] = []) {
    this.multigraf = new Multigraf<Context>(bots);
  }

  async createMicroservice(
    module: any,
    launchOptions: LaunchOptions = {},
    options: MultigrafOptions,
  ): Promise<INestMicroservice> {
    if (options.session) {
      this.multigraf.use(session());
    }

    const strategy = new MultigrafTransport(this.multigraf, launchOptions);

    return await NestFactory.createMicroservice(
      NestMultigrafModule.forRoot(module, this.multigraf),
      {
        strategy: strategy,
      },
    );
  }
}
