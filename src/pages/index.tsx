import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import EventCard from 'src/components/EventCard/EventCard'
import styles from 'src/styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Polling App</title>
        <meta name="description" content="Sport events polling app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {`Vote who's going to win!`}
        </h1>

        <EventCard />
      </main>
    </div>
  )
}

export default Home
