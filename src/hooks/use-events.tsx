import React, { useState, useEffect, useReducer, Reducer } from 'react';
import { getAllEvents } from 'src/actions/api';
import { State, DispatchEvent } from 'src/types';

const defaultState: State = {

};

function reducer(state: State, event: DispatchEvent): State {
    if (event.type === 'SET_EVENTS_DATA') {

    }


    return state;
}

interface EventsContextProps {
    state: State;
    dispatch: React.Dispatch<DispatchEvent>;
}

const EventsContext = React.createContext<EventsContextProps>({
    state: defaultState,
    dispatch: () => undefined,
});

export default function EventsContextProvider(props: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer<Reducer<State, DispatchEvent>>(reducer, defaultState);

    async function fetchEventToPoll() {
        try {
            const response = await getAllEvents();
            dispatch({ type: 'SET_EVENTS_DATA', data: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', error });
        }
    }

    useEffect(() => {
        fetchEventToPoll();
    }, [])

    return <EventsContext.Provider value={{ state, dispatch }}>{props.children}</EventsContext.Provider>
}
