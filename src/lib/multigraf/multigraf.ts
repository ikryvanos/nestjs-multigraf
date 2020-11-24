import { Composer, Telegraf, Telegram } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import Koa = require('koa');
import koaBody = require('koa-body');
import KoaRouter = require('koa-router');
import { Server } from 'http';
import { promisify } from 'util';

export interface Context extends TelegrafContext {
  multiGrafInfo: {
    bot: Bot;
  };
  [key: string]: any;
}

type WebhookOptions = {
  host: string;
  /**
   * web server port, by default 80
   */
  port?: number;
  /**
   * server protocol, by default http
   */
  protocol?: 'http' | 'https';
};

export type LaunchOptions = {
  polling?: {
    timeout?: number;

    /** Limits the number of updates to be retrieved in one call */
    limit?: number;
  };
  webhook?: WebhookOptions;
};

export type BotOptions = {
  name: string;
  token: string;
};

export type Bot = {
  name: string;
  telegram: Telegram;
};

const DEFAULT_WEBHOOK_PORT = 80;
const UPDATE_ENDPOINT = '/:name/update';

function getWebHookUrl(
  { host, port = DEFAULT_WEBHOOK_PORT, protocol = 'http' }: WebhookOptions,
  postfix: string,
) {
  return `${protocol}://${host}:${port}${postfix}`;
}

export class Multigraf<TContext extends Context = Context> extends Composer<
  TContext
> {
  private isServerStarted = false;
  private launchOptions: LaunchOptions;
  private webApp: Koa = null;
  private httpServer: Server = null;
  private readonly bots = new Map<string, Telegraf<TContext>>();

  constructor(botsOptions: BotOptions[] = []) {
    super();

    botsOptions.forEach(options => this._addBot(options));
  }

  async _launchBot(
    name,
    bot: Telegraf<TContext>,
    launchOptions: LaunchOptions,
  ): Promise<void> {
    if (!launchOptions.webhook) {
      await bot.launch({
        polling: launchOptions.polling ?? {},
      });
      return;
    }

    const webhookUrl = getWebHookUrl(launchOptions.webhook, UPDATE_ENDPOINT);
    await bot.telegram.setWebhook(webhookUrl);
  }

  async _startServer(options: WebhookOptions): Promise<void> {
    const webApp = new Koa();

    const router = new KoaRouter();
    router.post(UPDATE_ENDPOINT, async ctx => {
      const botName = ctx.params.name;

      const bot = this.bots.get(botName);
      if (!bot) {
        ctx.status = 404;
      }

      await bot.handleUpdate(ctx.request.body);
      ctx.status = 200;
    });

    webApp.use(koaBody());
    webApp.use(router.routes());
    this.httpServer = webApp.listen(options.port || DEFAULT_WEBHOOK_PORT);
    this.webApp = webApp;
  }

  _addBot({ name, token }: BotOptions): Telegraf<TContext> {
    if (this.bots.has(name)) {
      throw new Error(`Bot with name "${name}" already added`);
    }

    const bot = new Telegraf<TContext>(token);
    bot.use((ctx, next) => {
      ctx.multiGrafInfo = {
        bot: {
          name,
          telegram: bot.telegram,
        },
      };
      this.middleware()(ctx, next);
    });

    this.bots.set(name, bot);

    return bot;
  }

  _removeBot(name) {
    this.bots.delete(name);
  }

  async addBot(options: BotOptions): Promise<Bot> {
    const bot = this._addBot(options);

    if (this.isServerStarted) {
      await this._launchBot(name, bot, this.launchOptions).catch(ex => {
        this._removeBot(name);
        throw ex;
      });
    }

    return {
      name: options.name,
      telegram: bot.telegram,
    };
  }

  async deleteBotByName(name): Promise<void> {
    const bot = this.bots.get(name);

    if (!bot) {
      return;
    }

    this.bots.delete(name);
    await bot.stop();
  }

  async launch(options: LaunchOptions): Promise<void> {
    if (options.webhook) {
      await this._startServer(options.webhook);
    }

    this.launchOptions = options;
    this.isServerStarted = true;

    for (const [name, bot] of this.bots.entries()) {
      await this._launchBot(name, bot, options);
    }
  }

  async stop(): Promise<void> {
    for (const bot of this.bots.values()) {
      await bot.stop();
    }

    if (this.httpServer) {
      await promisify(this.httpServer.close)();
      this.httpServer = null;
      this.webApp = null;
    }
  }

  async getBotByName(name: string): Promise<Bot> {
    let bot = null;

    const telegraf = this.bots.get(name);
    if (telegraf) {
      bot = {
        name: name,
        telegram: telegraf.telegram,
      };
    }

    return bot;
  }
}
