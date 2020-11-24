import { HearsTriggers } from './multigraf';

export const MultigrafHearsTriggerSerialize = {
  serialize(triggers: HearsTriggers): string | string[] {
    if (Array.isArray(triggers)) {
      return (triggers as any[]).map(this.serialize);
    }

    let descriptor: { type: 'regex' | 'string' | 'function'; value: any };

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

  deserialize(triggers: string | string[]): HearsTriggers {
    if (Array.isArray(triggers)) {
      return triggers.map(trigger => this.deserialize(trigger));
    }

    const descriptor = JSON.parse(triggers);
    let result: HearsTriggers;
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
