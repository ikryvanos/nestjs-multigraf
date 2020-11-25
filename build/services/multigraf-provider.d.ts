import { BotOptions, Multigraf, Context, Middleware } from '../lib/multigraf';
export declare class MultiGrafProvider<TContext extends Context = Context> {
    private readonly multigraf;
    constructor(multigraf: Multigraf);
    addBot(options: BotOptions): Promise<import("../lib/multigraf").Bot>;
    deleteBotByName(name: any): Promise<void>;
    getBotByName(name: any): Promise<import("../lib/multigraf").Bot>;
    use(...middlewares: ReadonlyArray<Middleware<TContext>>): Multigraf<Context>;
}
