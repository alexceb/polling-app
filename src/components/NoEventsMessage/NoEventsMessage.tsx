import styles from './NoEventsMessage.module.scss';

function NoEventsMessage() {
    return (
        <div className={styles.messageContainer}>
            <span className={styles.message}>
                No more oncoming events
            </span>
        </div>
    );
}

export default NoEventsMessage;
