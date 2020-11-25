import { BotOptions, Context } from '../lib/multigraf';
import { INestMicroservice } from '@nestjs/common';
import { LaunchOptions } from '../lib/multigraf';
export declare type MultigrafOptions = {
    session: boolean | {};
};
export declare class NestMultigrafAppFactory<TContext extends Context = Context> {
    private readonly multigraf;
    constructor(bots?: BotOptions[]);
    createMicroservice(module: any, launchOptions: LaunchOptions, options: MultigrafOptions): Promise<INestMicroservice>;
}
