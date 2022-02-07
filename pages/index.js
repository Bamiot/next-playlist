import Layout from './components/layout'
import Header from './components/header'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import LocalStorage from '../utils/localStarage'

export default function Home() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({})
  useEffect(function () {
    const userData = LocalStorage.getLocalData('user-data')
    if (userData) {
      setIsLogged(true)
      setUser(userData)
    } else {
      setIsLogged(false)
    }
  }, [])

  return (
    <div className={styles.container}>
      <button>Click</button>
    </div>
  )
}
