import { HearsTriggers } from '../lib/multigraf';
import { ActionTriggers, MultiGrafCommands, MultiGrafOnUpdateTypes } from '../types';
export declare function MultiGrafStart(): MethodDecorator;
export declare function MultiGrafHears(triggers: HearsTriggers): MethodDecorator;
export declare function MultiGrafAction(triggers: ActionTriggers): MethodDecorator;
export declare function MultiGrafOn(triggers: MultiGrafOnUpdateTypes): MethodDecorator;
export declare function MultiGrafCommand(commands: MultiGrafCommands): MethodDecorator;
export declare function MultiGrafHelp(): MethodDecorator;
