import { model, Schema, Model } from 'mongoose';
import { EventInterface } from 'src/types/event';

const EventSchema: Schema = new Schema<EventInterface>({
    objectId: { type: String, required: true },
    group: { type: String, required: true },
    name: { type: String, required: true },
    homeName: { type: String, required: true },
    awayName: { type: String, required: true },
    sport: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
});

const EventModel: Model<EventInterface> = model('Event', EventSchema);

export default EventModel;
