import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Multigraf, LaunchOptions } from '../lib/multigraf';
export declare class MultigrafTransport extends Server implements CustomTransportStrategy {
    private readonly multigraf;
    private readonly launchOptions;
    constructor(multigraf: Multigraf, launchOptions: LaunchOptions);
    listen(callback: () => void): Promise<void>;
    close(): Promise<void>;
}
