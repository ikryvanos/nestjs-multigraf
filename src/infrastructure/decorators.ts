import { MessagePattern } from '@nestjs/microservices';
import { HearsTriggers } from '../lib/multigraf';
import { MultigrafHearsTriggerSerialize as HearsTriggerSerialize } from '../lib/multigraf-hears-triggers-serializer';
import {
  ActionTriggers,
  eventType,
  MultiGrafCommands,
  MultiGrafEvent,
  MultiGrafOnUpdateTypes,
} from '../types';

function MultiGrafMessagePatten(eventPattern: MultiGrafEvent) {
  return MessagePattern(JSON.stringify(eventPattern));
}

export function MultiGrafStart() {
  return MultiGrafMessagePatten({
    MultiGrafPattern: true,
    event: eventType.start,
  });
}

export function MultiGrafHears(triggers: HearsTriggers) {
  const serializedTriggers = HearsTriggerSerialize.serialize(triggers);

  return MultiGrafMessagePatten({
    MultiGrafPattern: true,
    event: eventType.hears,
    triggers: serializedTriggers,
  });
}

export function MultiGrafAction(triggers: ActionTriggers) {
  const serializedTriggers = HearsTriggerSerialize.serialize(triggers);

  return MultiGrafMessagePatten({
    MultiGrafPattern: true,
    event: eventType.actions,
    triggers: serializedTriggers,
  });
}

export function MultiGrafOn(triggers: MultiGrafOnUpdateTypes) {
  return MultiGrafMessagePatten({
    MultiGrafPattern: true,
    event: eventType.update,
    triggers: triggers,
  });
}

export function MultiGrafCommand(commands: MultiGrafCommands) {
  return MultiGrafMessagePatten({
    MultiGrafPattern: true,
    event: eventType.command,
    triggers: commands,
  });
}

export function MultiGrafHelp() {
  return MultiGrafMessagePatten({
    MultiGrafPattern: true,
    event: eventType.help,
  });
}
