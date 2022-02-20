import Image from 'next/image'
import styles from './searchedSong.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faYoutube, faDeezer } from '@fortawesome/free-brands-svg-icons'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import ServicesLink from '../servicesLink/servicesLink'

export default function SearchedSong({ song, onClick }) {
  const duration = new Date(song ? song.duration : 0)

  const findThumbnail = (width, square = true) => {
    if (song) {
      const filteredThumbnails = [...song.thumbnails]
        .reverse()
        .filter((e) => !square || e.width === e.height)

      let thumbnail = filteredThumbnails.find((e) => e.width >= width)
      while (!thumbnail) {
        width--
        thumbnail = filteredThumbnails.find((e) => e.width >= width)
      }

      return thumbnail
    } else return null
  }

  const smallThumbnail = findThumbnail(98)
  const bigThumbnail = findThumbnail(300)

  return song ? (
    <div
      className={styles.container}
      onClick={(e) => {
        const s = { ...song }
        s.thumbnail = { bigThumbnail, smallThumbnail }
        onClick(s)
      }}
    >
      <figure>
        <Image
          src={song ? smallThumbnail.url || song.thumbnails[0].url : ''}
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
      {song._id ? (
        <div className={styles.know}>
          <FontAwesomeIcon icon={faDatabase} />
        </div>
      ) : null}
      <ServicesLink pIds={song ? song.pIds : {}} className={styles.services} />
    </div>
  ) : null
}
