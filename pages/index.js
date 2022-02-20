import Layout from './components/layout'
import Header from './components/header'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import LocalStorage from '../utils/localStarage'
import SearchedSong from './components/searchedSong'

export default function Home({ songs }) {
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

  function redirectSong(song) {
    window.location.href = `/song/${song._id}`
  }

  return (
    <div className={styles.container}>
      <ul>
        {songs.map((song, i) => (
          <li key={i}>
            <SearchedSong song={song} onClick={redirectSong} className={styles.song} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const baseUrl = process.env.BASE_URL

export async function getServerSideProps(context) {
  const songs = await fetch(`${baseUrl}/api/songs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
  return {
    props: {
      songs: songs.result
    }
  }
}
