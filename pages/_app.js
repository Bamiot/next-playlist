import Layout from './components/layout'
import Header from './components/header'
import LocalStorage from '../utils/localStarage'
import '../styles/globals.scss'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  let userData
  useEffect(function () {
    userData = LocalStorage.getLocalData('user-data')
    console.log('user: ', userData)
  }, [])

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
