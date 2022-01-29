import Layout from './components/layout'
import Header from './components/header'
import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout>
        <Header />
        {page}
      </Layout>
    ))
  return getLayout(<Component {...pageProps} />)
}
