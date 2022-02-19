import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './header.module.scss'
import LocalStorage from '../../../utils/localStarage'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

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

export default function Header() {
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

  return (
    <header className={[styles.header].join(' ')}>
      <div
        className={[styles.burger, open ? styles.open : null].join(' ')}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
      <nav className={open ? styles.open : null}>
        <NavElement href="/" name="Home" />
        {isLogged ? <NavElement href="/search" name="Search" /> : null}
        <NavElement href="/account" name="Account" />
        <footer>
          Version: <span>{version}</span>
        </footer>
      </nav>
      <h1>Next-playlist</h1>
    </header>
  )
}
