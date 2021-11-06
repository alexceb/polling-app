import { model, Schema, Model, Document } from 'mongoose';

type EventState = 'STARTED' | 'NOT_STARTED' | 'FINISHED';

interface EventInterface extends Document {
    objectId: number;
    group: string;
    name: string;
    homeName: string;
    awayName: string;
    sport: string;
    country: string;
    state: EventState;
    createdAt?: string;
}

const EventSchema: Schema = new Schema<EventInterface>({
    // id: { type: Number, required: true },
    objectId: { type: Number, required: true },
    group: { type: String, required: true },
    name: { type: String, required: true },
    homeName: { type: String, required: true },
    awayName: { type: String, required: true },
    sport: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    createdAt: String,
});

const EventModel: Model<EventInterface> = model('Event', EventSchema);

export default EventModel;
