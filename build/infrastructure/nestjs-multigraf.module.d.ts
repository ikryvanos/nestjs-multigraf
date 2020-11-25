import { DynamicModule } from '@nestjs/common';
import { Multigraf } from '../lib/multigraf';
export declare class NestMultigrafModule {
    static forRoot(module: any, multigraf: Multigraf): DynamicModule;
}
