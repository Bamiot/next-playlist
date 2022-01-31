import Layout from './components/layout'
import Header from './components/header'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home({ status }) {
  return <div className={styles.container}>yo</div>
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/status`)
  const status = await res.json()
  return {
    props: {
      status: status.status === 'ok' ? 'online' : 'offline'
    }
  }
}
