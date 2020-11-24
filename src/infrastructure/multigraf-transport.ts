import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Multigraf, LaunchOptions } from '../lib/multigraf';
import { eventType, MultiGrafEvent } from '../types';
import { MultigrafHearsTriggerSerialize as HearsTriggerSerialize } from '../lib/multigraf-hears-triggers-serializer';
import { ActionTriggers } from '../types';

export class MultigrafTransport extends Server
  implements CustomTransportStrategy {
  constructor(
    private readonly multigraf: Multigraf,
    private readonly launchOptions: LaunchOptions,
  ) {
    super();
  }

  public async listen(callback: () => void) {
    for (const [pattern, handler] of this.messageHandlers.entries()) {
      const {
        event,
        triggers: rawTriggers,
        MultiGrafPattern,
      }: MultiGrafEvent = JSON.parse(pattern);
      if (!MultiGrafPattern) {
        // skip not MultiGraf patterns
        continue;
      }

      switch (event) {
        case eventType.start:
          this.multigraf.start(handler);

          break;
        case eventType.hears:
          const hearTriggers = HearsTriggerSerialize.deserialize(rawTriggers);
          this.multigraf.hears(hearTriggers, handler);

          break;
        case eventType.actions:
          const actionTriggers: ActionTriggers = HearsTriggerSerialize.deserialize(
            rawTriggers,
          );
          this.multigraf.action(actionTriggers, handler);

          break;
        case eventType.command:
          this.multigraf.command(rawTriggers, handler);

          break;

        case eventType.help:
          this.multigraf.help(handler);

          break;
      }
    }

    await this.multigraf.launch(this.launchOptions);
    callback();
  }

  async close(): Promise<void> {
    this.multigraf.stop().catch((error: Error) => {
      this.logger.error(
        {
          message: 'Unable to stop MultiGraf',
          error: error.message,
        },
        error.stack,
      );
    });
  }
}
