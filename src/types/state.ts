import { EventInterface } from ".";

export type Winner = 'home' | 'draw' | 'guest'

export interface Vote {
    eventId: string;
    winner: Winner;
}

interface InitialData {
    events: EventInterface[];
    votes: Vote[];
}

interface FetchDataSuccess {
    type: 'SET_DATA';
    data: InitialData;
}

interface FetchError {
    type: 'FETCH_ERROR';
    error: any;
}

interface VoteForWinner {
    type: 'VOTE_FOR_EVENT';
    data: Vote;
}

interface UpdateFromLocalStorage {
    type: 'UPDATE_FROM_LOCAL_STORAGE';
    data: Vote[];
}

export interface Effect {
    type: 'readFromLocalStorage' | 'saveToLocalStorage';
    status: 'idle' | 'started';
    markAsStarted: () => undefined;
 }

export type DispatchEvent = 
    | FetchDataSuccess
    | FetchError
    | VoteForWinner
    | UpdateFromLocalStorage

export interface State {
    allEvents: EventInterface[] | null;
    activeEvent: EventInterface | null;
    votes?: Vote[];
    effects?: Effect[];
}
