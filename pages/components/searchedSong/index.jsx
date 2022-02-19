import Image from 'next/image'
import styles from './searchedSong.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSpotify, faYoutube, faDeezer } from '@fortawesome/free-brands-svg-icons'

export default function SearchedSong({ song }) {
  const duration = new Date(song ? song.duration : 0)
  // console.log(song)

  // find best thumbnail
  const useThumbnail = song.thumbnails
    .reverse()
    .find((t) => t.width === t.height && t.width >= 98)

  return song ? (
    <div className={styles.container}>
      <figure>
        <Image
          src={song ? useThumbnail.url || song.thumbnails[0].url : ''}
          alt={song ? song.name : 'error'}
          layout="fixed"
          height="98px"
          width="98px"
        />
      </figure>
      <div className={styles.info}>
        <h1>{song ? song.name : ''}</h1>
        <span>{song ? song.artists.join(', ') : ''}</span>
        <span>{song && song.album ? song.album : ''}</span>
        <span>{`${duration ? duration.getMinutes() : 0}:${
          duration && duration.getSeconds() > 9 ? '' : '0'
        }${duration ? duration.getSeconds() : 0}`}</span>
      </div>
      <div className={styles.services}>
        <FontAwesomeIcon
          icon={faSpotify}
          onClick={() =>
            window.open(`https://open.spotify.com/track/${song.pIds.spotify}`, '_blank')
          }
          className={[
            styles.spotify,
            song.pIds.spotify !== undefined ? null : styles.missing
          ].join(' ')}
        />
        <FontAwesomeIcon
          icon={faYoutube}
          onClick={() => {
            window.open(
              `https://music.youtube.com/watch?v=${song.pIds.youtube}`,
              '_blank'
            )
          }}
          className={[
            styles.youtube,
            song.pIds.youtube !== undefined ? null : styles.missing
          ].join(' ')}
        />
        <FontAwesomeIcon
          icon={faDeezer}
          onClick={() => {
            window.open(`https://deezer.com/track/${song.pIds.deezer}`, '_blank')
          }}
          className={[
            styles.deezer,
            song.pIds.deezer !== undefined ? null : styles.missing
          ].join(' ')}
        />
      </div>
    </div>
  ) : null
}
