import React, { useEffect, useReducer, Reducer } from 'react';
import { getAllEvents, getAllVotes } from 'src/actions/api';
import { effectTypes } from 'src/constants/state';
import { State, DispatchEvent, EventInterface, Vote } from 'src/types';
import { createEffect } from 'src/utils/effect';

interface EventsContextProps {
    state: State;
    dispatch: React.Dispatch<DispatchEvent>;
}

function hasVoted(votes: Vote[], eventId: string) {
    return votes.find(vote => vote.eventId === eventId) !== undefined;
}

function getUnvotedEvents(events: EventInterface[], votes: Vote[]) {
    return events.filter(event => !hasVoted(votes, event.objectId));
}

function selectInitialEvent(unvoted: EventInterface[]): EventInterface {
    return unvoted[Math.floor(Math.random() * unvoted.length)];
}

function reducer(state: State, event: DispatchEvent): State {
    if (event.type === 'SET_DATA') {
        const { events, votes } = event.data;
        // Get all events that have't finished yet
        const unfinishedEvents: EventInterface[] = events
            .filter(item => item.state !== 'FINISHED');
        const unvotedEvents: EventInterface[] = getUnvotedEvents(unfinishedEvents, votes);
        return {
            ...state,
            votes,
            allEvents: unvotedEvents,
            activeEvent: selectInitialEvent(unvotedEvents),
        }
    }

    if (event.type === 'VOTE_FOR_EVENT') {
        const remainingEvents = state.allEvents!.filter(eventObj => eventObj.objectId !== event.data.eventId);
        const nextEvent = remainingEvents.length ? { ...remainingEvents[0] } : null;
        return {
            ...state,
            allEvents: remainingEvents,
            activeEvent: nextEvent,
            votes: [
                ...state.votes!,
                event.data,
            ],
            effects: [
                ...state.effects!,
                createEffect(effectTypes.SAVE_TO_LOCAL_STORAGE, {}),
            ]
        }
    }

    if (event.type === 'UPDATE_FROM_LOCAL_STORAGE') {
        return {
            ...state,
            votes: [ ...event.data ],
        };
    }

    return state;
}

const localStorageName = 'votingData';

const defaultState: State = {
    allEvents: null,
    activeEvent: null,
    votes: [],
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

    async function fetchInitialState() {
        try {
            const { data: events } = await getAllEvents();
            const { data: votes } = await getAllVotes();
            dispatch({ type: 'SET_DATA', data: { events, votes } });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', error });
        }
    }

    useEffect(() => {
        fetchInitialState();
    }, [])

    useEffect(() => {
        for (const effect of effects!) {
            if (effect.status !== 'idle') {
                continue;
            }
            effect.markAsStarted();

            if (effect.type === effectTypes.READ_FROM_LOCAL_STORAGE) {
                try {
                    const lsData: string | null = localStorage.getItem(localStorageName);
                    dispatch({ type: 'UPDATE_FROM_LOCAL_STORAGE', data: lsData? JSON.parse(lsData) : [] });
                } catch {}
            }

            if (effect.type === effectTypes.SAVE_TO_LOCAL_STORAGE) {
                try {
                    const data = JSON.parse(JSON.stringify(state.votes));
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
