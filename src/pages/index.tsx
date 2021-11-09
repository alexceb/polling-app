import type { NextPage } from 'next'
import Head from 'next/head'

import { Loader } from 'src/components/Loader/Loader'
import { useEvents } from 'src/hooks/use-events'
import EventCard from 'src/components/EventCard/EventCard'

import styles from 'src/styles/Home.module.scss'

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
                    <h1 className={styles.title}>
                        {`Vote who's going to win!`}
                    </h1>

                    <EventCard />
                </main>
            ) : (
                <Loader />
            )}
        </div>
  )
}

export default Home
