import { transport } from "src/utils/transport";
import { EventInterface } from "src/types/event";

interface AllEventsResponse {
    data: EventInterface[];
    success: boolean;
}

export function getAllEvents(): Promise<AllEventsResponse> {
    return transport.get('/api/events');
}
