import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Tw Heroicons</title>
        <script src='https://unpkg.com/datocms-plugins-sdk' />
        <link href='https://unpkg.com/datocms-plugins-sdk/dist/sdk.css' media='all' rel='stylesheet' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
