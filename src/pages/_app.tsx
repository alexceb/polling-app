import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import EventsContextProvider from 'src/hooks/use-events';

function MyApp({ Component, pageProps }: AppProps) {
  	return (
		<EventsContextProvider>
			<Component {...pageProps} />
		</EventsContextProvider>
	)
}

export default MyApp
