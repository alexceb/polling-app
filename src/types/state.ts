import { EventInterface } from ".";

interface FetchDataSuccess {
    type: 'SET_EVENTS_DATA';
    data: EventInterface[];
}

interface FetchError {
    type: 'FETCH_ERROR';
    error: any;
}

export type DispatchEvent = 
    | FetchDataSuccess
    | FetchError

export interface State {

}
