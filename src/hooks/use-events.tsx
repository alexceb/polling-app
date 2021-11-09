import React, { useEffect, useReducer, Reducer } from 'react';
import { getAllEvents } from 'src/actions/api';
import { effectTypes } from 'src/constants/state';
import { State, DispatchEvent, EventInterface } from 'src/types';
import { createEffect } from 'src/utils/effect';

interface EventsContextProps {
    state: State;
    dispatch: React.Dispatch<DispatchEvent>;
}

function getEventToDisplay(allEvents: EventInterface[]) {
    return allEvents[0];
}

function reducer(state: State, event: DispatchEvent): State {
    if (event.type === 'SET_EVENTS_DATA') {
        // Get all events that hasn't finished yet
        const events: EventInterface[] = event.data.filter(item => item.state !== 'FINISHED');
        return {
            ...state,
            allEvents: events,
            activeEvent: getEventToDisplay(events),
        }
    }

    if (event.type === 'VOTE_FOR_EVENT') {
        console.log('Voting for - ', event.data);
        return {
            ...state,
        }
    }

    if (event.type === 'UPDATE_FROM_LOCAL_STORAGE') {
        return {
            ...state,
            ...event.data,
        };
    }

    return state;
}

const localStorageName = 'votingData';

const defaultState: State = {
    allEvents: null,
    activeEvent: null,
    effects: [
        createEffect(effectTypes.READ_FROM_LOCAL_STORAGE, {}),
    ],
};

const EventsContext = React.createContext<EventsContextProps>({
    state: defaultState,
    dispatch: () => undefined,
});

export default function EventsContextProvider(props: { children: React.ReactNode }) {
    const [{ effects, ...state }, dispatch] = useReducer<Reducer<State, DispatchEvent>>(reducer, defaultState);

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

    useEffect(() => {
        for (const effect of effects!) {
            if (effect.status !== 'idle') {
                continue;
            }
            effect.markAsStarted();

            if (effect.type === effectTypes.READ_FROM_LOCAL_STORAGE) {
                try {
                    const data: string | null = localStorage.getItem(localStorageName);
                    dispatch({ type: 'UPDATE_FROM_LOCAL_STORAGE', data: JSON.parse(data!) });
                } catch {}
            }

            if (effect.type === effectTypes.SAVE_TO_LOCAL_STORAGE) {
                try {
                    const data = JSON.parse(JSON.stringify(state));
                    delete data.status;
                    localStorage.setItem(localStorageName, JSON.stringify(data));
                } catch {}
            }
        }
    }, [state, effects])

    return <EventsContext.Provider value={{ state, dispatch }}>{props.children}</EventsContext.Provider>
}

export function useEvents() {
    return React.useContext(EventsContext);
}
