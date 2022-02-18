import styles from './loadingSpinner.module.scss'

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
