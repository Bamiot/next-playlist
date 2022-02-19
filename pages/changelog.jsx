import styles from '../styles/Changelog.module.scss'

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
    version: 'v0.0.2',
    features: ['Added a changelog'],
    fix: ['change pages name']
  }
]

export default function Changelog() {
  return (
    <div className={styles.container}>
      <h1>Changelog</h1>
      <ul>
        {update.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </ul>
    </div>
  )
}
