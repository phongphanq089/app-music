'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Pause,
  Play,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { HeadphoneIcon } from './elements/IconUi'
import { usePlayerStore } from '~/stores/usePlayerStore'
import { cn } from '~/lib/utils'
import Image from 'next/image'

export const MusicPlayer = () => {
  const [open, setOpen] = useState(true)

  const { currentTrack, nextTrack, prevTrack } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [shufflePlay, setShufflePlay] = useState(false)
  const [repeat, setRepeat] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!currentTrack || !audio) return

    const playAudio = async () => {
      try {
        audio.src = currentTrack.audioUrl
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.error('Failed to play audio:', err)
      }
    }

    playAudio()

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () =>
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }, [currentTrack])

  const nextTrackAuto = useCallback(
    () => nextTrack(shufflePlay),
    [nextTrack, shufflePlay]
  )
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        nextTrackAuto()
      }
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [repeat, nextTrackAuto])

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setProgress(audioRef.current.currentTime)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
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

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (!currentTrack) return null
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50'
            key='bottom'
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className='bg-white/40 backdrop-blur text-white flex items-center justify-between px-4 py-4 min-h-[90px] max-lg:flex-col max-lg:gap-6'>
              <div className='flex items-center w-full lg:w-[500px] max-lg:justify-center'>
                <div className='px-5 flex items-center gap-5'>
                  <motion.div
                    className={cn('w-9 h-9')}
                    animate={{
                      rotate: isPlaying ? 360 : 0,
                    }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: 5,
                    }}
                  >
                    <Image
                      src={'/headphone.png'}
                      width={100}
                      height={100}
                      alt='APP MUSIC'
                    />
                  </motion.div>
                  <div className='flex flex-col text-black'>
                    <div className='text-sm font-semibold line-clamp-1'>
                      {currentTrack.title}
                    </div>
                    <div className='text-xs line-clamp-1'>
                      {currentTrack.artist}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex-1 max-lg:w-full'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='flex gap-7 items-center'>
                    <button
                      onClick={() => setShufflePlay(!shufflePlay)}
                      className={
                        shufflePlay
                          ? 'text-blue-400 cursor-pointer'
                          : 'cursor-pointer'
                      }
                    >
                      <Shuffle size={20} />
                    </button>
                    <button onClick={prevTrack} className='cursor-pointer'>
                      <SkipBack size={24} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className='cursor-pointer border p-2 rounded-4xl'
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                      onClick={() => nextTrack(shufflePlay)}
                      className='cursor-pointer'
                    >
                      <SkipForward size={24} />
                    </button>
                    <button
                      onClick={() => setRepeat(!repeat)}
                      className={
                        repeat
                          ? 'text-green-400 cursor-pointer'
                          : 'cursor-pointer'
                      }
                    >
                      <Repeat size={20} />
                    </button>
                  </div>
                  <div className='flex items-center gap-2 text-xs w-full'>
                    <span className='w-10 text-right'>
                      {formatTime(progress)}
                    </span>
                    <input
                      type='range'
                      min={0}
                      max={duration || 1}
                      value={progress}
                      onChange={handleSeek}
                      className='
                      w-full h-1 bg-linear-to-t from-sky-500 to-indigo-500 rounded-lg appearance-none
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-white
                      [&::-webkit-slider-thumb]:shadow-md
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:h-4
                      [&::-moz-range-thumb]:w-4
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-white
                      [&::-moz-range-thumb]:shadow-md
                      [&::-moz-range-thumb]:cursor-pointer
                      focus:outline-none
                    '
                      style={{
                        background: `linear-gradient(to right, #16ece2 ${(progress / duration) * 100}%, #444 ${(progress / duration) * 100}%)`,
                      }}
                    />
                    <span className='w-10 text-left'>
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className='fixed z-10 right-0 bottom-[100px] size-11  rounded-md border bg-black text-white cursor-pointer flex items-center justify-center'
        onClick={() => setOpen(!open)}
      >
        <HeadphoneIcon className='w-6 h-6' />
      </div>
      <audio ref={audioRef} className='opacity-0' />
    </>
  )
}
