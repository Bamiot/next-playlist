import styles from '../styles/Search.module.scss'
import { useState, useEffect } from 'react'
import LocalStorage from '../utils/localStarage'
import { faSearch, faTimes, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchedSong from './components/searchedSong'
import LoadingSpinner from './components/loadingSpinner/loadingSpinner'
import Image from 'next/image'
import ServicesLink from './components/servicesLink/servicesLink'

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

export default function Song() {
  const [query, setQuery] = useState('')
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalSong, setModalSong] = useState(null)
  const [searchUrl, setSearchUrl] = useState(false)

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

  async function search(event) {
    event.preventDefault()
    setLoading(true)
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        token: user.token,
        query: query
      })
    })
    const data = await response.json()
    if (data.status === 'error') {
      // alert(data.message)
      setSongs([])
    } else {
      console.log(data.result)
      setSongs(data.result)
    }
    setLoading(false)
  }

  async function addToDB(song) {
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        token: user.token,
        song: song
      })
    })
    const data = await response.json()
    if (data.status === 'error') {
      alert(data.message)
    } else {
      // console.log(data.result)
      window.location.href = `/song/${data.result.insertedId}`
    }
  }

  function redirectSong(song) {
    window.location.href = `/song/${song._id}`
  }

  return isLogged ? (
    <div className={styles.container}>
      <form onSubmit={search} className={[searchUrl ? styles.url : ''].join(' ')}>
        <input
          type="text"
          placeholder="Search song"
          value={query}
          onChange={(e) => {
            setSearchUrl(!!e.target.value.match(urlRegex))
            setQuery(e.target.value)
          }}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        </button>
        {/* {searchUrl ? <FontAwesomeIcon icon={faLink} className={styles.icon} /> : null} */}
      </form>
      <ul>
        {loading ? (
          <LoadingSpinner />
        ) : songs.length > 0 ? (
          songs.map((song, i) => (
            <li key={i}>
              <SearchedSong
                song={song}
                onClick={song._id ? redirectSong : setModalSong}
              />
            </li>
          ))
        ) : (
          <li style={{ textAlign: 'center' }}>
            No results, try with a more precise search, for example with the artist or the
            album.
            {/* <br /> <i>or with URL (Beta)</i> */}
          </li>
        )}
      </ul>
      {modalSong ? (
        <div
          className={styles.modal}
          onClick={(e) => {
            if (e.target.className === styles.modal) setModalSong(null)
          }}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{modalSong.name}</h2>
              <b>{modalSong.artists.join(', ')}</b>
              <p>{modalSong.album}</p>
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.modalClose}
                onClick={() => setModalSong(null)}
              />
            </div>
            <ServicesLink pIds={modalSong.pIds} className={styles.modalServices} />
            <figure
              onClick={(e) => {
                e.stopPropagation()
                addToDB(modalSong)
              }}
            >
              <Image
                src={modalSong.thumbnail.bigThumbnail.url}
                alt={modalSong.name}
                width="300px"
                height="300px"
              />
            </figure>
            <b>tags coming soon</b>
          </div>
        </div>
      ) : null}
    </div>
  ) : null
}
