import { Context, HearsTriggers } from '../lib/multigraf';
import {
  UpdateType,
  MessageSubTypes,
} from '../lib/multigraf/typings/telegram-types';

export enum eventType {
  start,
  hears,
  actions,
  update,
  command,
  help,
}

export type MultiGrafEvent = {
  MultiGrafPattern: true;
  event: eventType;
  triggers?: any;
};

export type ActionTriggers<TContext extends Context = Context> = HearsTriggers<
  TContext
>;

export type MultiGrafOnUpdateTypes =
  | UpdateType
  | UpdateType[]
  | MessageSubTypes
  | MessageSubTypes[];

export type MultiGrafCommands = string | string[];
