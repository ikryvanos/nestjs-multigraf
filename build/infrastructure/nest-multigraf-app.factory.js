"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMultigrafAppFactory = void 0;
const multigraf_1 = require("../lib/multigraf");
const multigraf_transport_1 = require("./multigraf-transport");
const core_1 = require("@nestjs/core");
const telegraf_1 = require("telegraf");
const nestjs_multigraf_module_1 = require("./nestjs-multigraf.module");
class NestMultigrafAppFactory {
    constructor(bots = []) {
        this.multigraf = new multigraf_1.Multigraf(bots);
    }
    async createMicroservice(module, launchOptions = {}, options) {
        if (options.session) {
            this.multigraf.use(telegraf_1.session());
        }
        const strategy = new multigraf_transport_1.MultigrafTransport(this.multigraf, launchOptions);
        return await core_1.NestFactory.createMicroservice(nestjs_multigraf_module_1.NestMultigrafModule.forRoot(module, this.multigraf), {
            strategy: strategy,
        });
    }
}
exports.NestMultigrafAppFactory = NestMultigrafAppFactory;
//# sourceMappingURL=nest-multigraf-app.factory.js.map