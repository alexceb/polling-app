import type { NextPage } from 'next';
import Head from 'next/head';

import { Loader } from 'src/components/Loader/Loader';
import { useEvents } from 'src/hooks/use-events';
import EventCard from 'src/components/EventCard/EventCard';
import NoEventsMessage from 'src/components/NoEventsMessage/NoEventsMessage';

import styles from 'src/styles/Home.module.scss';

const Home: NextPage = () => {
    const { state } = useEvents();

    return (
        <div className={styles.container}>
            <Head>
                <title>Polling App</title>
                <meta name="description" content="Sport events polling app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {state.allEvents? (
                <main className={styles.main}>
                    {state.activeEvent? (
                        <EventCard />
                    ) : (
                        <NoEventsMessage />
                    )}
                </main>
            ) : (
                <Loader />
            )}
        </div>
  )
}

export default Home
