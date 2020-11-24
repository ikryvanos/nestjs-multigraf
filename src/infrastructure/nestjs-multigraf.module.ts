import { DynamicModule, Module } from '@nestjs/common';
import { Multigraf } from '../lib/multigraf';
import { MultiGrafProvider } from '../services';

@Module({})
export class NestMultigrafModule {
  static forRoot(module: any, multigraf: Multigraf): DynamicModule {
    return {
      global: true,
      imports: [module],
      providers: [
        {
          provide: MultiGrafProvider,
          useValue: new MultiGrafProvider(multigraf),
        },
      ],
      exports: [MultiGrafProvider],
      module: NestMultigrafModule,
    };
  }
}
