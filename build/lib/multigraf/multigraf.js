"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multigraf = void 0;
const telegraf_1 = require("telegraf");
const Koa = require("koa");
const koaBody = require("koa-body");
const KoaRouter = require("koa-router");
const util_1 = require("util");
const DEFAULT_WEBHOOK_PORT = 80;
const UPDATE_ENDPOINT = '/:name/update';
function getWebHookUrl({ host, port = DEFAULT_WEBHOOK_PORT, protocol = 'http' }, postfix) {
    return `${protocol}://${host}:${port}${postfix}`;
}
class Multigraf extends telegraf_1.Composer {
    constructor(botsOptions = []) {
        super();
        this.isServerStarted = false;
        this.webApp = null;
        this.httpServer = null;
        this.bots = new Map();
        botsOptions.forEach(options => this._addBot(options));
    }
    async _launchBot(name, bot, launchOptions) {
        var _a;
        if (!launchOptions.webhook) {
            await bot.launch({
                polling: (_a = launchOptions.polling) !== null && _a !== void 0 ? _a : {},
            });
            return;
        }
        const webhookUrl = getWebHookUrl(launchOptions.webhook, UPDATE_ENDPOINT);
        await bot.telegram.setWebhook(webhookUrl);
    }
    async _startServer(options) {
        const webApp = new Koa();
        const router = new KoaRouter();
        router.post(UPDATE_ENDPOINT, async (ctx) => {
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
    _addBot({ name, token }) {
        if (this.bots.has(name)) {
            throw new Error(`Bot with name "${name}" already added`);
        }
        const bot = new telegraf_1.Telegraf(token);
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
    async addBot(options) {
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
    async deleteBotByName(name) {
        const bot = this.bots.get(name);
        if (!bot) {
            return;
        }
        this.bots.delete(name);
        await bot.stop();
    }
    async launch(options) {
        if (options.webhook) {
            await this._startServer(options.webhook);
        }
        this.launchOptions = options;
        this.isServerStarted = true;
        for (const [name, bot] of this.bots.entries()) {
            await this._launchBot(name, bot, options);
        }
    }
    async stop() {
        for (const bot of this.bots.values()) {
            await bot.stop();
        }
        if (this.httpServer) {
            await util_1.promisify(this.httpServer.close)();
            this.httpServer = null;
            this.webApp = null;
        }
    }
    async getBotByName(name) {
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
exports.Multigraf = Multigraf;
//# sourceMappingURL=multigraf.js.map