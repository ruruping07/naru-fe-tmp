import '../styles/globals.css'
import '../public/realgrid.2.5.4/realgrid-style.css'

import type { AppProps } from 'next/app'
import Head from 'next/head';
import Layout from "../components/Layout"
//import { ApolloProvider } from "@apollo/client"
//import client from "../libs/apollo"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="/realgrid.2.5.4/realgrid-lic.js" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
