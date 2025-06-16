'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { usePlayer } from '~/providers/PlayerContext'

type Track = {
  _id: string
  title: string
  artist: string
  coverImage: string
  audioUrl: string
  duration?: string
}

export const TrackCard = ({ track, tracks }: { track: Track; tracks }) => {
  const { playTrack } = usePlayer()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='rounded-xl border shadow p-4 w-full max-w-md bg-white'
      // onClick={() => playTrack(track)}
      onClick={() => playTrack(track, tracks)}
    >
      <Image
        src={track.coverImage}
        alt={track.title}
        className='rounded-xl mb-4 w-full h-48 object-cover'
        height={200}
        width={200}
      />
      <div className='font-bold text-lg'>{track.title}</div>
      <div className='text-sm text-gray-500'>
        {track.artist} · {track.duration}
      </div>
      <div className='mt-2'>
        <audio controls className='w-full'>
          <source src={track.audioUrl} type='audio/mpeg' />
        </audio>
      </div>
    </motion.div>
  )
}
