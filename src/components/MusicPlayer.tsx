'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Pause,
  Play,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
} from 'lucide-react'
import { usePlayer } from '~/providers/PlayerContext'

export const MusicPlayer = () => {
  const { currentTrack, trackList, playTrack, nextTrack, prevTrack } =
    usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

  // Phát bài khi currentTrack thay đổi
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return
    audioRef.current.src = currentTrack.audioUrl
    audioRef.current.play()
    setIsPlaying(true)
  }, [currentTrack])

  // Tự động cập nhật progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setProgress(audioRef.current.currentTime)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Khi bài hát kết thúc
  const handleEnded = () => {
    if (repeat) {
      audioRef.current?.play()
    } else {
      nextTrack(shuffle)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  if (!currentTrack) return null

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md text-white p-4 border-t border-white/10'>
      <div className='flex items-center gap-4'>
        <img
          src={currentTrack.coverImage}
          alt={currentTrack.title}
          className='w-12 h-12 object-cover rounded'
        />
        <div className='flex-1'>
          <div className='font-semibold'>{currentTrack.title}</div>
          <div className='text-sm text-gray-300'>{currentTrack.artist}</div>

          {/* Thanh tiến độ */}
          <input
            type='range'
            min={0}
            max={audioRef.current?.duration || 1}
            value={progress}
            onChange={handleSeek}
            className='w-full mt-2'
          />
        </div>

        {/* Các nút điều khiển */}
        <div className='flex gap-2 items-center'>
          <button onClick={prevTrack}>
            <SkipBack />
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={() => nextTrack(shuffle)}>
            <SkipForward />
          </button>
          <button
            onClick={() => setRepeat(!repeat)}
            className={repeat ? 'text-green-400' : ''}
          >
            <Repeat />
          </button>
          <button
            onClick={() => setShuffle(!shuffle)}
            className={shuffle ? 'text-blue-400' : ''}
          >
            <Shuffle />
          </button>
        </div>
      </div>
      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  )
}
