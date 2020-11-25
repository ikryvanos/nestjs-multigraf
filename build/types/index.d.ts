import { Context, HearsTriggers } from '../lib/multigraf';
import { UpdateType, MessageSubTypes } from '../lib/multigraf/typings/telegram-types';
export declare enum eventType {
    start = 0,
    hears = 1,
    actions = 2,
    update = 3,
    command = 4,
    help = 5
}
export declare type MultiGrafEvent = {
    MultiGrafPattern: true;
    event: eventType;
    triggers?: any;
};
export declare type ActionTriggers<TContext extends Context = Context> = HearsTriggers<TContext>;
export declare type MultiGrafOnUpdateTypes = UpdateType | UpdateType[] | MessageSubTypes | MessageSubTypes[];
export declare type MultiGrafCommands = string | string[];
