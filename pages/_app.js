import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(
    <div>
      <Head>
        <title>Frontend 001</title>
      </Head>
      <div className="container mx-auto px-4">
        <div className='flex justify-center align-middle'>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
