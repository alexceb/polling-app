type EventState = 'STARTED' | 'NOT_STARTED' | 'FINISHED';

export interface EventInterface extends Document {
    objectId: string;
    group: string;
    name: string;
    homeName: string;
    awayName: string;
    sport: string;
    country: string;
    state: EventState;
}
