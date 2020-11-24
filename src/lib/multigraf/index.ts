import * as ComposerClass from 'telegraf/composer';
export const Composer = ComposerClass;

import * as MarkupClass from 'telegraf/markup';
export const Markup = MarkupClass;

import * as BaseSceneClass from 'telegraf/scenes/base';
export const BaseScene = BaseSceneClass;

import * as sessionClass from 'telegraf/session';
export const session = sessionClass;

import * as StageClass from 'telegraf/stage';
export const Stage = StageClass;

import * as WizardSceneClass from 'telegraf/scenes/wizard';
export const WizardScene = WizardSceneClass;

export { Middleware, Telegram } from 'telegraf';
export {
  Context,
  Multigraf,
  BotOptions,
  Bot,
  LaunchOptions,
} from './multigraf';

import { Context } from './multigraf';
import { HearsTriggers as HearsTriggersGeneric } from 'telegraf/typings/composer';

export type HearsTriggers<
  TContext extends Context = Context
> = HearsTriggersGeneric<TContext>;
