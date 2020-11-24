import { DynamicModule, Module } from '@nestjs/common';
import { Multigraf } from '../lib/multigraf';
import { MultigrafProvider } from '../services';

@Module({})
export class NestMultigrafModule {
  static forRoot(module: any, multigraf: Multigraf): DynamicModule {
    return {
      global: true,
      imports: [module],
      providers: [
        {
          provide: MultigrafProvider,
          useValue: new MultigrafProvider(multigraf),
        },
      ],
      exports: [MultigrafProvider],
      module: NestMultigrafModule,
    };
  }
}
