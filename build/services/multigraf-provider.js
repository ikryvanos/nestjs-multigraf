"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiGrafProvider = void 0;
class MultiGrafProvider {
    constructor(multigraf) {
        this.multigraf = multigraf;
    }
    async addBot(options) {
        return this.multigraf.addBot(options);
    }
    async deleteBotByName(name) {
        return this.multigraf.deleteBotByName(name);
    }
    async getBotByName(name) {
        return this.multigraf.getBotByName(name);
    }
    use(...middlewares) {
        return this.multigraf.use(...middlewares);
    }
}
exports.MultiGrafProvider = MultiGrafProvider;
//# sourceMappingURL=multigraf-provider.js.map