import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './header.module.scss'
import LocalStorage from '../../../utils/localStarage'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useSwipeable } from 'react-swipeable'

const { publicRuntimeConfig } = getConfig()
const { version } = publicRuntimeConfig

function NavElement({ href, name }) {
  const router = useRouter()
  return (
    <Link href={href}>
      <a className={router.pathname == href ? styles.active : null}>{name}</a>
    </Link>
  )
}

export default function Header({ children }) {
  const [open, setOpen] = useState(false)

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

  if (typeof document !== 'undefined')
    document.addEventListener('click', (e) => {
      if (e.target.closest('header')) return
      setOpen(false)
    })

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (SwipeEvent) => {
      console.log('swiped left', SwipeEvent)
      setOpen(false)
    },
    onSwipedRight: (SwipeEvent) => {
      console.log('swiped right', SwipeEvent)
      setTimeout(() => {
        setOpen(true)
      }, 5)
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true
  })

  return (
    <header className={[styles.header].join(' ')}>
      {/* burger button  */}
      <div
        className={[styles.burger, open ? styles.open : null].join(' ')}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
      {/* nav bar */}
      <nav className={open ? styles.open : null}>
        <div className={styles.swipeHandle} {...swipeHandlers}></div>
        <NavElement href="/" name="Home" />
        {isLogged ? <NavElement href="/search" name="Search" /> : null}
        <NavElement href="/account" name="Account" />
        <NavElement href="/changelog" name="Changelog" />
        <footer>
          Version: <span>{version}</span>
        </footer>
      </nav>
      {/* content */}
      <div className={styles.content}>
        <Link href={'/'}>
          <h1>Next-playlist</h1>
        </Link>
        {children}
      </div>
    </header>
  )
}
