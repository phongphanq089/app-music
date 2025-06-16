'use client'

import { usePlayer } from '~/providers/PlayerContext'

export const QueueList = () => {
  const { queue, playTrack, trackList } = usePlayer()

  if (!queue.length)
    return (
      <div className='text-sm text-gray-500'>Không có bài hát tiếp theo</div>
    )

  return (
    <div className='p-4 bg-gray-900 rounded shadow text-white space-y-3'>
      <h2 className='text-lg font-semibold mb-2'>Tiếp theo</h2>
      {queue.map((track) => (
        <div
          key={track._id}
          className='flex gap-3 items-center cursor-pointer hover:bg-gray-800 p-2 rounded'
          onClick={() => playTrack(track, trackList)}
        >
          <img
            src={track.coverImage}
            className='w-10 h-10 object-cover rounded'
          />
          <div>
            <div className='font-medium'>{track.title}</div>
            <div className='text-sm text-gray-400'>{track.artist}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
