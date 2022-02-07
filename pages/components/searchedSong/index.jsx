import Image from 'next/image'
import styles from './searchedSong.module.scss'

export default function SearchedSong({ song }) {
  const duration = new Date(song.duration || 0)
  return (
    <div className={styles.container}>
      <figure>
        <Image
          src={song.thumbnail.url}
          alt={song.name}
          layout="fixed"
          height="98px"
          width="98px"
        />
      </figure>
      <div>
        <h1>{song.name}</h1>
        <span>{song.artist.name}</span>
        <span>{song.album.name}</span>
        <span>{`${duration.getMinutes()}:${
          duration.getSeconds() > 9 ? '' : '0'
        }${duration.getSeconds()}`}</span>
      </div>
    </div>
  )
}
