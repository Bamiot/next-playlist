import styles from '../styles/Changelog.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Post = ({ title, version, features, fix }) => (
  <li className={styles.post}>
    <h2 className={styles.title}>
      {title} <span>{version}</span>{' '}
    </h2>
    <ul className={styles.features}>
      <h3>Features</h3>
      {features ? features.map((feature, index) => <li key={index}>{feature}</li>) : null}
    </ul>
    <ul className={styles.fix}>
      <h3>Fix</h3>
      {fix ? fix.map((fix, index) => <li key={index}>{fix}</li>) : null}
    </ul>
  </li>
)

const update = [
  {
    title: 'Changelog',
    version: 'v0.1.1',
    features: ['Added a changelog'],
    fix: ['change pages name']
  },
  {
    title: 'DB',
    version: 'v0.2.0',
    features: ['add track to database (without tags)'],
    fix: ['use the thumbnail with the most appropriate size']
  },
  {
    title: 'Share !',
    version: 'v0.2.1',
    features: ['dynamically creates sharing page for each track in the database (WIP)'],
    fix: ['many fixs']
  },
  {
    title: 'page name',
    version: 'v0.2.2',
    features: ['sharing pages are named with the track name'],
    fix: ['fix service icons size']
  },
  {
    title: 'track in homepage',
    version: 'v0.2.3',
    features: [
      'view all tracks in homepage',
      'adds who added the sound',
      'clicking on the "logo" redirects to home'
    ],
    fix: ['fix changelog scroll']
  }
]

export default function Changelog() {
  return (
    <div className={styles.container}>
      <h1>
        Changelog
        <FontAwesomeIcon
          icon={faGithub}
          onClick={() => {
            window.open(`https://github.com/Bamiot/next-playlist`, '_blank')
          }}
          className={styles.github}
        />{' '}
      </h1>
      <ul>
        {[...update].reverse().map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </ul>
    </div>
  )
}
