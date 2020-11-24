Module to create a NestJS microservice to run several telegraf bots.


# Architecture
```
                                                                                    /**********************\
                                                                                    |                      |
                                                                                    |  MultiGrafProvider   |
                                                                                    |                      |
                                                                                    \**********************/
                                                                                              ||
                                                                                              || Uses
                                                                                              \/
          /**********************\             /**********************\             /**********************\
          |                      |  Include    |                      |  Includes   |                      |
          |  NestJS Microservice | =========>  |  MultiGrafTransport  | =========>  |       MultiGraf      |
          |                      |             |                      |             |                      |
          \**********************/             \**********************/             \**********************/
                                                                                              ||
                                                                                              || Includes
                                                                                              \/
                                                                                    /**********************\
                                                                                    |                      |
                                                                                    |       Telegraf       |
                                                                                    |                      |
                                                                                    \**********************/
```

## NestJS Microservice
Is nestjs application with `MultiGrafProvide` in global context

## MultiGrafTransport
Is a nest js app transport to handle client <> server communication.
It start server or runs `MultiGraph` in polling mode.

## MultiGrafProvider
NestJs provider to manage `MultiGraf`

## MultiGraf
One bot to manage all other. 
Component to manupulate several telegraf bots with possibility to starts and stop them in runntime

# Usage

## Start the app
To create nestjs app you need to create a microservice via factory
```typescript
import { Module } from '@nestjs/common';
import { NestMultigrafAppFactory } from 'nestjs-multigraf';

// You root module
@Module({})
export class AppModule {}

const nestMultigraf = new NestMultigrafAppFactory([
  {
    name: 'some-bot-name', // unique bot name to manage it inside the app
    token: '', // you bot access token
  },
]);

async function bootstrap() {
  const app = await nestMultigraf.createMicroservice(AppModule, {});

  app.listen(() => {
    // Log something
  });
}
bootstrap();
```

## Handle telegraf updates
To handle telegraf updates you may create a nestjs controller and declear handlers using decorators.
Here the controller example
```typescript
import { Injectable } from '@nestjs/common';
import { MultiGrafStart, Context } from 'nestjs-multigraf';

@Injectable()
export class StartController {
  @MultiGrafStart()
  async onStart(context: Context) {
    await context.reply('Hi');
  }
}
```

Following decorators are available now:
- MultiGrafStart
- MultiGrafHears
- MultiGrafAction
- MultiGrafOn
- MultiGrafCommand
- MultiGrafHelp
