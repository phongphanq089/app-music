/* eslint-disable @next/next/no-img-element */
'use client'

import { usePlayer } from '~/providers/PlayerContext'
import { Track } from '~/types'

export const TrackListItem = ({ track }: { track: Track }) => {
  const { playTrack } = usePlayer()

  return (
    <div
      className='flex items-center gap-4 p-4 hover:bg-white/10 rounded cursor-pointer'
      onClick={() => playTrack(track)}
    >
      <img
        src={track.coverImage}
        alt={track.title}
        className='w-16 h-16 object-cover rounded'
      />
      <div>
        <div className='font-semibold'>{track.title}</div>
        <div className='text-sm text-gray-300'>{track.artist}</div>
      </div>
    </div>
  )
}
