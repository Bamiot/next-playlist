import Image from 'next/image'
import styles from './searchedSong.module.scss'

export default function SearchedSong({ song }) {
  const duration = new Date(song ? song.duration : 0)
  return song ? (
    <div className={styles.container}>
      <figure>
        <Image
          src={song ? song.thumbnail.url : ''}
          alt={song ? song.name : 'error'}
          layout="fixed"
          height="98px"
          width="98px"
        />
      </figure>
      <div>
        <h1>{song ? song.name : ''}</h1>
        <span>{song ? song.artist.name : ''}</span>
        <span>{song ? song.album.name : ''}</span>
        <span>{`${duration ? duration.getMinutes() : 0}:${
          duration && duration.getSeconds() > 9 ? '' : '0'
        }${duration ? duration.getSeconds() : 0}`}</span>
      </div>
    </div>
  ) : null
}
