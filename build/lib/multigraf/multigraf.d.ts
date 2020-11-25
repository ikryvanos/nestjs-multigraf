import { Composer, Telegraf, Telegram } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
export interface Context extends TelegrafContext {
    multiGrafInfo: {
        bot: Bot;
    };
    [key: string]: any;
}
declare type WebhookOptions = {
    host: string;
    port?: number;
    protocol?: 'http' | 'https';
};
export declare type LaunchOptions = {
    polling?: {
        timeout?: number;
        limit?: number;
    };
    webhook?: WebhookOptions;
};
export declare type BotOptions = {
    name: string;
    token: string;
};
export declare type Bot = {
    name: string;
    telegram: Telegram;
};
export declare class Multigraf<TContext extends Context = Context> extends Composer<TContext> {
    private isServerStarted;
    private launchOptions;
    private webApp;
    private httpServer;
    private readonly bots;
    constructor(botsOptions?: BotOptions[]);
    _launchBot(name: any, bot: Telegraf<TContext>, launchOptions: LaunchOptions): Promise<void>;
    _startServer(options: WebhookOptions): Promise<void>;
    _addBot({ name, token }: BotOptions): Telegraf<TContext>;
    _removeBot(name: any): void;
    addBot(options: BotOptions): Promise<Bot>;
    deleteBotByName(name: any): Promise<void>;
    launch(options: LaunchOptions): Promise<void>;
    stop(): Promise<void>;
    getBotByName(name: string): Promise<Bot>;
}
export {};
