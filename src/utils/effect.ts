import { Effect } from "src/types";

export function createEffect(type: string, args: any): Effect {
    return {
        ...args,
        type,
        status: 'idle',
        markAsStarted() {
            this.status = 'started';
        },
    };
}
