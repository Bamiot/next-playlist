import styles from '../../styles/Song.module.scss'
import { useState, useEffect } from 'react'
import LocalStorage from '../../utils/localStarage'
import Image from 'next/image'
import ServicesLink from '../components/servicesLink/servicesLink'

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export default function Post({ song }) {
  const duration = new Date(song ? song.duration : 0)
  const releaseDate = new Date(song ? song.releaseDate : 0)

  // console.log(song)

  return song ? (
    <div className={styles.container}>
      <figure>
        <Image
          src={song.thumbnails[0].url}
          alt={song.name}
          className={styles.image}
          width={song.thumbnails[0].width}
          height={song.thumbnails[0].height}
        />
      </figure>
      <h1>{song ? song.name : ''}</h1>
      <span>{song ? song.artists.join(', ') : ''}</span>
      <span>{song && song.album ? song.album : ''}</span>
      <span>{`${duration ? duration.getMinutes() : 0}:${
        duration && duration.getSeconds() > 9 ? '' : '0'
      }${duration ? duration.getSeconds() : 0}`}</span>
      <span>
        {releaseDate
          ? `${releaseDate.getDay()} ${
              MONTH[releaseDate.getMonth()]
            } ${releaseDate.getFullYear()}`
          : 'nd'}
      </span>

      <ServicesLink pIds={song ? song.pIds : {}} className={styles.serviceLink} />
    </div>
  ) : null
}

const baseUrl = process.env.BASE_URL

export async function getStaticProps({ params }) {
  const { id } = params
  const song = await fetch(`${baseUrl}/api/song?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())

  return {
    props: {
      id,
      song: song.result
    }
  }
}

export async function getStaticPaths() {
  const songs = await fetch(`${baseUrl}/api/songs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
    }
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })

  const paths =
    songs && songs.result
      ? songs.result.map((song) => ({
          params: {
            id: song._id
          }
        }))
      : []

  return {
    paths,
    fallback: true
  }
}
