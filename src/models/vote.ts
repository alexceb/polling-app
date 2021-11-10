import { models, model, Schema } from 'mongoose';
import { VoteInterface } from 'src/types/vote';

const VoteSchema: Schema = new Schema<VoteInterface>({
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    winner: { type: String, required: true },
});

export default models.Vote || model('Vote', VoteSchema);
