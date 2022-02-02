import { useState, useEffect } from 'react'
import LocalStorage from '../utils/localStarage'
import styles from '../styles/Login.module.scss'

const LabeledInput = ({ name, type, value, cb, className }) => (
  <div className={[styles.labeledInput, className].join(' ')}>
    <label htmlFor={name}>
      {name}
      {': '}
    </label>
    <input type={type} name={name} value={value} onChange={(e) => cb(e.target.value)} />
  </div>
)

export default function Home() {
  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [joinName, setJoinName] = useState('')
  const [joinMail, setJoinMail] = useState('')
  const [joinPassword, setJoinPassword] = useState('')
  const [joinPasswordConfirm, setJoinPasswordConfirm] = useState('')
  const [invitation, setInvitation] = useState('')

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

  async function login(event) {
    event.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: loginName, password: loginPassword })
    })
    const data = await response.json()
    if (data.status === 'error') {
      alert(data.message)
    } else {
      LocalStorage.saveLocalData('user-data', data.user)
      window.location.href = '/'
    }
  }

  async function join(event) {
    event.preventDefault()
    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: joinName,
        password: joinPassword,
        mail: joinMail,
        invitation
      })
    })
    const data = await response.json()
    if (data.status === 'error') {
      alert(data.message)
    } else {
      LocalStorage.saveLocalData('user-data', data.user)
      window.location.href = '/'
    }
  }

  function getInvitation(e) {
    e.target.innerHTML = 'Loading...'
    fetch('/api/invitation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        token: user.token
      })
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.status === 'error') {
          alert(data.message)
          console.log(data.message)
        } else {
          alert('Invitation copy to clipboard')
          console.log(data.invitation)
          e.target.innerHTML = 'Copied !'
          if ('clipboard' in navigator)
            return await navigator.clipboard.writeText(data.invitation)
          else return document.execCommand('copy', true, data.invitation)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  function logout(event) {
    event.preventDefault()
    LocalStorage.removeLocalData('user-data')
    window.location.href = '/'
  }

  return isLogged ? (
    <div className={[styles.container, styles.logged].join(' ')}>
      <h1>logged as {user.name}</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={getInvitation}>Get invitation code</button>
    </div>
  ) : (
    <div className={styles.container}>
      <form onSubmit={login}>
        <h1>Login</h1>
        <LabeledInput name="Username" type="text" value={loginName} cb={setLoginName} />
        <LabeledInput
          name="Password"
          type="password"
          value={loginPassword}
          cb={setLoginPassword}
        />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={join}>
        <h1>Join</h1>
        <LabeledInput name="Username" type="text" value={joinName} cb={setJoinName} />
        <LabeledInput name="Email" type="email" value={joinMail} cb={setJoinMail} />
        <LabeledInput
          name="Password"
          type="password"
          value={joinPassword}
          cb={setJoinPassword}
        />
        <LabeledInput
          name="Confirmation"
          type="password"
          value={joinPasswordConfirm}
          cb={setJoinPasswordConfirm}
        />
        <LabeledInput
          name="Invitation"
          type="text"
          value={invitation}
          cb={setInvitation}
        />
        <p>all fields are required</p>
        <button>Join</button>
      </form>
    </div>
  )
}
