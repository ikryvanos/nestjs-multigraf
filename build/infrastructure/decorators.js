"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiGrafHelp = exports.MultiGrafCommand = exports.MultiGrafOn = exports.MultiGrafAction = exports.MultiGrafHears = exports.MultiGrafStart = void 0;
const microservices_1 = require("@nestjs/microservices");
const multigraf_hears_triggers_serializer_1 = require("../lib/multigraf-hears-triggers-serializer");
const types_1 = require("../types");
function MultiGrafMessagePatten(eventPattern) {
    return microservices_1.MessagePattern(JSON.stringify(eventPattern));
}
function MultiGrafStart() {
    return MultiGrafMessagePatten({
        MultiGrafPattern: true,
        event: types_1.eventType.start,
    });
}
exports.MultiGrafStart = MultiGrafStart;
function MultiGrafHears(triggers) {
    const serializedTriggers = multigraf_hears_triggers_serializer_1.MultigrafHearsTriggerSerialize.serialize(triggers);
    return MultiGrafMessagePatten({
        MultiGrafPattern: true,
        event: types_1.eventType.hears,
        triggers: serializedTriggers,
    });
}
exports.MultiGrafHears = MultiGrafHears;
function MultiGrafAction(triggers) {
    const serializedTriggers = multigraf_hears_triggers_serializer_1.MultigrafHearsTriggerSerialize.serialize(triggers);
    return MultiGrafMessagePatten({
        MultiGrafPattern: true,
        event: types_1.eventType.actions,
        triggers: serializedTriggers,
    });
}
exports.MultiGrafAction = MultiGrafAction;
function MultiGrafOn(triggers) {
    return MultiGrafMessagePatten({
        MultiGrafPattern: true,
        event: types_1.eventType.update,
        triggers: triggers,
    });
}
exports.MultiGrafOn = MultiGrafOn;
function MultiGrafCommand(commands) {
    return MultiGrafMessagePatten({
        MultiGrafPattern: true,
        event: types_1.eventType.command,
        triggers: commands,
    });
}
exports.MultiGrafCommand = MultiGrafCommand;
function MultiGrafHelp() {
    return MultiGrafMessagePatten({
        MultiGrafPattern: true,
        event: types_1.eventType.help,
    });
}
exports.MultiGrafHelp = MultiGrafHelp;
//# sourceMappingURL=decorators.js.map