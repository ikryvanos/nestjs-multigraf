"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultigrafHearsTriggerSerialize = void 0;
exports.MultigrafHearsTriggerSerialize = {
    serialize(triggers) {
        if (Array.isArray(triggers)) {
            return triggers.map(this.serialize);
        }
        let descriptor;
        if (typeof triggers === 'string') {
            descriptor = {
                type: 'string',
                value: triggers,
            };
        }
        if (triggers instanceof RegExp) {
            descriptor = {
                type: 'regex',
                value: {
                    regex: triggers.source,
                    flags: triggers.flags,
                },
            };
        }
        if (typeof triggers === 'function') {
            descriptor = {
                type: 'function',
                value: triggers.toString(),
            };
        }
        return JSON.stringify(descriptor);
    },
    deserialize(triggers) {
        if (Array.isArray(triggers)) {
            return triggers.map(trigger => this.deserialize(trigger));
        }
        const descriptor = JSON.parse(triggers);
        let result;
        switch (descriptor.type) {
            case 'regex':
                result = RegExp(descriptor.value.regex, descriptor.value.flags);
                break;
            case 'string':
                result = descriptor.value;
                break;
            case 'function':
                result = eval(descriptor.value);
                break;
            default:
                throw new Error(`Type ${descriptor.type} not supported`);
        }
        return result;
    },
};
//# sourceMappingURL=multigraf-hears-triggers-serializer.js.map