import { EventInterface } from ".";

export type Winner = 'home' | 'draw' | 'guest'

interface FetchDataSuccess {
    type: 'SET_EVENTS_DATA';
    data: EventInterface[];
}

interface FetchError {
    type: 'FETCH_ERROR';
    error: any;
}

interface VoteForWinner {
    type: 'VOTE_FOR_EVENT';
    data: Winner;
}

interface UpdateFromLocalStorage {
    type: 'UPDATE_FROM_LOCAL_STORAGE';
    data: State;
}

export interface Effect {
    type: 'readFromLocalStorage' | 'saveToLocalStorage';
    status: 'idle' | 'started',
    markAsStarted: () => void
 }

export type DispatchEvent = 
    | FetchDataSuccess
    | FetchError
    | VoteForWinner
    | UpdateFromLocalStorage

export interface State {
    allEvents: EventInterface[] | null;
    activeEvent: EventInterface | null;
    effects?: Effect[];
}
