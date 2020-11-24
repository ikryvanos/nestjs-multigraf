import { BotOptions, Multigraf, Context, Middleware } from '../lib/multigraf';

export class MultiGrafProvider<TContext extends Context = Context> {
  constructor(private readonly multigraf: Multigraf) {}

  async addBot(options: BotOptions) {
    return this.multigraf.addBot(options);
  }

  async deleteBotByName(name) {
    return this.multigraf.deleteBotByName(name);
  }

  async getBotByName(name) {
    return this.multigraf.getBotByName(name);
  }

  use(...middlewares: ReadonlyArray<Middleware<TContext>>) {
    return this.multigraf.use(...middlewares);
  }
}
