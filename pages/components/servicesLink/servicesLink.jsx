import styles from './servicesLink.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faYoutube, faDeezer } from '@fortawesome/free-brands-svg-icons'

export default function ServicesLink({ pIds, className }) {
  return pIds ? (
    <div className={[styles.services, className].join(' ')}>
      <FontAwesomeIcon
        icon={faSpotify}
        onClick={() =>
          window.open(`https://open.spotify.com/track/${pIds.spotify}`, '_blank')
        }
        className={[
          styles.spotify,
          pIds.spotify !== undefined ? null : styles.missing
        ].join(' ')}
      />
      <FontAwesomeIcon
        icon={faYoutube}
        onClick={() => {
          window.open(`https://music.youtube.com/watch?v=${pIds.youtube}`, '_blank')
        }}
        className={[
          styles.youtube,
          pIds.youtube !== undefined ? null : styles.missing
        ].join(' ')}
      />
      <FontAwesomeIcon
        icon={faDeezer}
        onClick={() => {
          window.open(`https://deezer.com/track/${pIds.deezer}`, '_blank')
        }}
        className={[
          styles.deezer,
          pIds.deezer !== undefined ? null : styles.missing
        ].join(' ')}
      />
    </div>
  ) : null
}
