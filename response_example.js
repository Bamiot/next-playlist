const spotify = {
  album: {
    album_type: 'album',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN'
        },
        href: 'https://api.spotify.com/v1/artists/4FpJcNgOvIpSBeJgRg3OfN',
        id: '4FpJcNgOvIpSBeJgRg3OfN',
        name: 'Orelsan',
        type: 'artist',
        uri: 'spotify:artist:4FpJcNgOvIpSBeJgRg3OfN'
      }
    ],
    external_urls: {
      spotify: 'https://open.spotify.com/album/2o2GBOfy2GG9oKYZgfZkur'
    },
    href: 'https://api.spotify.com/v1/albums/2o2GBOfy2GG9oKYZgfZkur',
    id: '2o2GBOfy2GG9oKYZgfZkur',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b27358ba1ea637001f9a15e55a92',
        width: 640
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e0258ba1ea637001f9a15e55a92',
        width: 300
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d0000485158ba1ea637001f9a15e55a92',
        width: 64
      }
    ],
    name: 'Civilisation',
    release_date: '2021-11-19',
    release_date_precision: 'day',
    total_tracks: 15,
    type: 'album',
    uri: 'spotify:album:2o2GBOfy2GG9oKYZgfZkur'
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN'
      },
      href: 'https://api.spotify.com/v1/artists/4FpJcNgOvIpSBeJgRg3OfN',
      id: '4FpJcNgOvIpSBeJgRg3OfN',
      name: 'Orelsan',
      type: 'artist',
      uri: 'spotify:artist:4FpJcNgOvIpSBeJgRg3OfN'
    }
  ],
  disc_number: 1,
  duration_ms: 153565,
  explicit: false,
  external_ids: { isrc: 'FR6F32102350' },
  external_urls: {
    spotify: 'https://open.spotify.com/track/3Z8gDycWX48tv06vVRMQtg'
  },
  href: 'https://api.spotify.com/v1/tracks/3Z8gDycWX48tv06vVRMQtg',
  id: '3Z8gDycWX48tv06vVRMQtg',
  is_local: false,
  is_playable: true,
  name: 'Shonen',
  popularity: 70,
  preview_url:
    'https://p.scdn.co/mp3-preview/b5f65ecf360268aa625214552536491e2a2a5bdd?cid=3526ed9851d74e779b0ced0bba1adf39',
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:3Z8gDycWX48tv06vVRMQtg'
}

const youtube = {
  kind: 'youtube#searchResult',
  etag: '2MK5iF8-WesNmDuZZp0GxU4mmz8',
  id: {
    kind: 'youtube#video',
    videoId: 'onsHz-qPREU'
  },
  snippet: {
    publishedAt: '2020-12-15T11:30:15Z',
    channelId: 'UCzqPDSvHEFSuRsN2xvsTCKA',
    title: 'Sköne - À la poursuite d&#39;un oiseau bleu',
    description:
      'Stream & Download : https://skone.fanlink.to/oiseaubleu Il y avait sur les quais une vieille gravure coloriée (n° CXIV, du Bon ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/onsHz-qPREU/default.jpg',
        width: 120,
        height: 90
      },
      medium: {
        url: 'https://i.ytimg.com/vi/onsHz-qPREU/mqdefault.jpg',
        width: 320,
        height: 180
      },
      high: {
        url: 'https://i.ytimg.com/vi/onsHz-qPREU/hqdefault.jpg',
        width: 480,
        height: 360
      }
    },
    channelTitle: 'Sköne',
    liveBroadcastContent: 'none',
    publishTime: '2020-12-15T11:30:15Z'
  }
}

const youtubeMusic = {
  type: 'song',
  videoId: 'zzOa0p9iITs',
  playlistId: 'RDAMVMzzOa0p9iITs',
  name: "À la poursuite d'un oiseau bleu",
  artist: { name: 'Sköne', browseId: 'UCbtKapaY_q15f4Mpre7tURg' },
  album: { name: 'Sköne', browseId: 'UCbtKapaY_q15f4Mpre7tURg' },
  duration: 447000,
  thumbnails: [
    {
      url: 'https://lh3.googleusercontent.com/16iTYKLTKYqzBi2sBg8iM_EB-e2wQx8yML_I79DZSdiE2KA5g1U9qMlb6bCz3EcH3bB9aNEjN0t3gtrq=w60-h60-l90-rj',
      width: 60,
      height: 60
    },
    {
      url: 'https://lh3.googleusercontent.com/16iTYKLTKYqzBi2sBg8iM_EB-e2wQx8yML_I79DZSdiE2KA5g1U9qMlb6bCz3EcH3bB9aNEjN0t3gtrq=w120-h120-l90-rj',
      width: 120,
      height: 120
    }
  ],
  params: 'wAEB'
}
