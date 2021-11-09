import { useEvents } from 'src/hooks/use-events';
import { Winner } from 'src/types';
import Button from '../Button/Button';
import styles from './EventCard.module.scss';

function EventCard() {
    const { state, dispatch } = useEvents();
    const { activeEvent } = state;
    const vote = (winnerType: Winner) => {
        dispatch({ type: 'VOTE_FOR_EVENT', data: winnerType })
    }

    return (
        <div className={styles.eventCardWrapper}>
            <div className={styles.eventDescription}>
                <div className={styles.participant}>{activeEvent?.homeName}</div>
                <div className={styles.divider}>VS</div>
                <div className={styles.participant}>{activeEvent?.awayName}</div>
            </div>
            <div className={styles.buttons}>
                <Button primary size="small" onClick={() => vote('home')}>Home</Button>
                <Button outline size="small" onClick={() => vote('draw')}>Draw</Button>
                <Button primary size="small" onClick={() => vote('guest')}>Guest</Button>
            </div>
        </div>
    );
}

export default EventCard;
