import { Fragment } from 'react';
import { useEvents } from 'src/hooks/use-events';
import { Vote, Winner } from 'src/types';
import { postVote } from 'src/actions/api';
import Button from '../Button/Button';
import styles from './EventCard.module.scss';

function EventCard() {
    const { state, dispatch } = useEvents();
    const { activeEvent } = state;

    async function postUserVote(voteObj: Vote) {
        try {
            const response = await postVote(voteObj);
            dispatch({ type: 'VOTE_FOR_EVENT', data: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', error });
        }
    }

    function VoteForWinner(winnerType: Winner) {
        const voteData = {
            eventId: activeEvent!.objectId,
            winner: winnerType,
        }
        postUserVote(voteData);
    }

    return (
        <Fragment>
            <h1 className={styles.title}>
                {`Vote who's going to win!`}
            </h1>
            <div className={styles.eventCardWrapper}>
                <div className={styles.eventDescription}>
                    <div className={styles.participant}>{activeEvent?.homeName}</div>
                    <div className={styles.divider}>VS</div>
                    <div className={styles.participant}>{activeEvent?.awayName}</div>
                </div>
                <div className={styles.buttons}>
                    <Button primary size="small" onClick={() => VoteForWinner('home')}>Home</Button>
                    <Button outline size="small" onClick={() => VoteForWinner('draw')}>Draw</Button>
                    <Button primary size="small" onClick={() => VoteForWinner('guest')}>Guest</Button>
                </div>
            </div>
        </Fragment>
    );
}

export default EventCard;
