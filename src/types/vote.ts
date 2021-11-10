import { Vote } from ".";

export interface VoteInterface extends Document, Vote {
    userId: string;
}
