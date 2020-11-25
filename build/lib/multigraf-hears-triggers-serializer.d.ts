import { HearsTriggers } from './multigraf';
export declare const MultigrafHearsTriggerSerialize: {
    serialize(triggers: HearsTriggers): string | string[];
    deserialize(triggers: string | string[]): HearsTriggers;
};
