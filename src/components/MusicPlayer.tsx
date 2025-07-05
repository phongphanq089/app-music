'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HeadphoneIcon } from './elements/IconUi'
import { usePlayerStore } from '~/stores/usePlayerStore'
import { cn } from '~/lib/utils'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player'

import { Repeat, Shuffle } from 'lucide-react'

export const MusicPlayer = () => {
  const [open, setOpen] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shufflePlay, setShufflePlay] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const { currentTrack, nextTrack, prevTrack } = usePlayerStore()

  if (!currentTrack) return null

  return (
    <>
      <AnimatePresence>
        <motion.div
          className='fixed bottom-0 left-0 right-0 z-50'
          key='bottom'
          animate={{
            y: open ? 0 : 200,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className='bg-white/40 backdrop-blur text-white flex items-center justify-between px-4 py-4 min-h-[90px] max-lg:flex-col max-lg:gap-6'>
            <button
              className='absolute -top-7 right-0 p-1 w-8 h-8 rounded-full bg-black hover:bg-black/80 text-white transition'
              onClick={() => setOpen(false)}
              title='Đóng trình phát'
            >
              ✕
            </button>
            <div className='flex items-center w-full lg:w-[500px] max-lg:justify-center'>
              <div className='px-5 flex items-center gap-5'>
                <motion.div
                  className={cn('w-9 h-9')}
                  animate={{ rotate: isPlaying ? 360 : 0 }}
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
              <div className='flex gap-4 items-center mb- min-w-[100px]'>
                <button
                  onClick={() => setShufflePlay(!shufflePlay)}
                  className={cn(
                    shufflePlay ? 'text-blue-400' : '',
                    'cursor-pointer'
                  )}
                >
                  <Shuffle size={20} />
                </button>
                <button
                  onClick={() => setRepeat(!repeat)}
                  className={cn(
                    repeat ? 'text-green-400' : '',
                    'cursor-pointer'
                  )}
                >
                  <Repeat size={20} />
                </button>
              </div>
            </div>

            <div className='flex-1 max-lg:w-full flex flex-col items-center gap-2'>
              <AudioPlayer
                autoPlay
                src={currentTrack.audioUrl}
                layout='horizontal'
                onEnded={() => {
                  if (repeat) {
                    const player = document.querySelector(
                      '.rhap_audio-element'
                    ) as HTMLAudioElement
                    if (player) {
                      player.currentTime = 0
                      player.play()
                    }
                  } else {
                    nextTrack(shufflePlay)
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                showSkipControls
                showJumpControls={false}
                onClickPrevious={prevTrack}
                onClickNext={() => nextTrack(shufflePlay)}
                customVolumeControls={[]}
                customAdditionalControls={[]}
                className='!bg-transparent text-black border-none shadow-none w-full  audio-player-custom'
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className='fixed z-10 right-0 bottom-0 size-11 rounded-md border bg-black text-white cursor-pointer flex items-center justify-center'
        onClick={() => setOpen(!open)}
      >
        <HeadphoneIcon className='w-6 h-6' />
      </div>
    </>
  )
}
