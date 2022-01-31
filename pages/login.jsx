import axios from 'axios'
import { useState } from 'react'
import styles from '../styles/Login.module.scss'

const LabeledInput = ({ name, type, value, cb }) => (
  <div className={styles.labeledInput}>
    <label htmlFor={name}>
      {name}
      {': '}
    </label>
    <input type={type} name={name} value={value} onChange={(e) => cb(e.target.value)} />
  </div>
)

async function login(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/problem+json'
    },
    body: JSON.stringify({ username, password })
  })
  console.log(response)
}

async function join(username, password, mail, invitation) {
  const response = await fetch('/api/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: { username, password, mail, invitation }
  })
  console.log(response)
}

export default function Home() {
  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [joinName, setJoinName] = useState('')
  const [joinMail, setJoinMail] = useState('')
  const [joinPassword, setJoinPassword] = useState('')
  const [joinPasswordConfirm, setJoinPasswordConfirm] = useState('')
  const [invitation, setInvitation] = useState('')

  return (
    <div className={styles.container}>
      <form>
        <h1>Login</h1>
        <LabeledInput name="Username" type="text" value={loginName} cb={setLoginName} />
        <LabeledInput
          name="Password"
          type="password"
          value={loginPassword}
          cb={setLoginPassword}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            login(loginName, loginPassword)
          }}
        >
          Login
        </button>
      </form>

      <form>
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
        <button
          onClick={(e) => {
            e.preventDefault()
            if (joinPassword === joinPasswordConfirm)
              join(joinName, joinPassword, joinMail, invitation)
          }}
        >
          Join
        </button>
      </form>
    </div>
  )
}
