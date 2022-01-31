import Link from 'next/link'
import { useState } from 'react'
import styles from './header.module.scss'

import { useRouter } from 'next/router'

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
        <NavElement href="/tuto" name="Tuto" />
        <NavElement href="/login" name="Login" />
      </nav>
      <h1>Next-playlist</h1>
    </header>
  )
}
