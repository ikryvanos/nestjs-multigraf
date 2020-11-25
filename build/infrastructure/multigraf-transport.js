"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultigrafTransport = void 0;
const microservices_1 = require("@nestjs/microservices");
const types_1 = require("../types");
const multigraf_hears_triggers_serializer_1 = require("../lib/multigraf-hears-triggers-serializer");
class MultigrafTransport extends microservices_1.Server {
    constructor(multigraf, launchOptions) {
        super();
        this.multigraf = multigraf;
        this.launchOptions = launchOptions;
    }
    async listen(callback) {
        for (const [pattern, handler] of this.messageHandlers.entries()) {
            const { event, triggers: rawTriggers, MultiGrafPattern, } = JSON.parse(pattern);
            if (!MultiGrafPattern) {
                continue;
            }
            switch (event) {
                case types_1.eventType.start:
                    this.multigraf.start(handler);
                    break;
                case types_1.eventType.hears:
                    const hearTriggers = multigraf_hears_triggers_serializer_1.MultigrafHearsTriggerSerialize.deserialize(rawTriggers);
                    this.multigraf.hears(hearTriggers, handler);
                    break;
                case types_1.eventType.actions:
                    const actionTriggers = multigraf_hears_triggers_serializer_1.MultigrafHearsTriggerSerialize.deserialize(rawTriggers);
                    this.multigraf.action(actionTriggers, handler);
                    break;
                case types_1.eventType.command:
                    this.multigraf.command(rawTriggers, handler);
                    break;
                case types_1.eventType.help:
                    this.multigraf.help(handler);
                    break;
            }
        }
        await this.multigraf.launch(this.launchOptions);
        callback();
    }
    async close() {
        this.multigraf.stop().catch((error) => {
            this.logger.error({
                message: 'Unable to stop MultiGraf',
                error: error.message,
            }, error.stack);
        });
    }
}
exports.MultigrafTransport = MultigrafTransport;
//# sourceMappingURL=multigraf-transport.js.map