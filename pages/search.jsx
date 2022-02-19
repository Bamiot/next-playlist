import styles from '../styles/Search.module.scss'
import { useState, useEffect } from 'react'
import LocalStorage from '../utils/localStarage'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchedSong from './components/searchedSong'
import LoadingSpinner from './components/loadingSpinner/loadingSpinner'

export default function Song() {
  const [query, setQuery] = useState('')
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)

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
      alert(data.message)
    } else {
      console.log(data.result)
      setSongs(data.result)
    }
    setLoading(false)
  }

  return isLogged ? (
    <div className={styles.container}>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Search song"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        </button>
      </form>
      <ul>
        {loading ? (
          <LoadingSpinner />
        ) : songs.length > 0 ? (
          songs.map((song, i) => (
            <li key={i}>
              <SearchedSong song={song} />
            </li>
          ))
        ) : (
          <li>
            No results, try with a more precise search, for example with the artist or the
            album.
          </li>
        )}
      </ul>
    </div>
  ) : null
}
