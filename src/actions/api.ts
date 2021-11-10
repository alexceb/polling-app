import { transport } from "src/utils/transport";
import { EventInterface } from "src/types/event";
import { Vote } from "src/types";

interface AllEventsResponse {
    data: EventInterface[];
    success: boolean;
}

interface PostVoteResponse {
    data: Vote;
    success: boolean;
}

interface AllUserVotesResponse {
    data: Vote[];
    success: boolean;
}

export function getAllEvents(): Promise<AllEventsResponse> {
    return transport.get('/api/events');
}

export function postVote(voteObj: Vote): Promise<PostVoteResponse> {
    return transport.post('/api/votes', voteObj);
}

export function getAllVotes(): Promise<AllUserVotesResponse> {
    return transport.get('/api/votes');
}
