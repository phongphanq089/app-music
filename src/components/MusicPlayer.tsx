'use client'
// @typescript-eslint/no-explicit-any
import { useState, useRef, useEffect } from 'react'
import { usePlayerStore } from '~/stores/usePlayerStore'
import { cn } from '~/lib/utils'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player'
import {
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
  List,
  Heart,
  X,
} from 'lucide-react'

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [shufflePlay, setShufflePlay] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const playerRef = useRef<AudioPlayer>(null)

  const { currentTrack, nextTrack, prevTrack, isPlayerExpanded, togglePlayer } =
    usePlayerStore()

  useEffect(() => {
    if (currentTrack && playerRef.current?.audio.current) {
      // Ensure audio plays when track changes
      // React-h5-audio-player's autoPlay prop handles initial load, but this ensures subsequent tracks play
    }
  }, [currentTrack])

  if (!currentTrack) return null

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.audio.current?.pause()
    } else {
      void playerRef.current?.audio.current?.play()
    }
  }

  return (
    <>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          isPlayerExpanded
            ? 'h-auto lg:h-24'
            : 'h-16 w-16 left-auto right-4 bottom-4 rounded-full overflow-hidden shadow-2xl border border-slate-700',
        )}
      >
        {/* Collapsed/Floating View */}
        {!isPlayerExpanded && (
          <div
            className='w-full h-full bg-slate-900 flex items-center justify-center relative group cursor-pointer'
            onClick={togglePlayer}
          >
            {currentTrack.coverImage && (
              <Image
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                fill
                className='object-cover opacity-80 group-hover:opacity-100 transition-opacity animate-[spin_10s_linear_infinite]'
              />
            )}
            <div className='absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors'>
              <div className='w-3 h-3 bg-primary rounded-full animate-pulse'></div>
            </div>
          </div>
        )}

        {/* Expanded View */}
        {isPlayerExpanded && (
          <footer className='h-full glass-panel border-t border-slate-800 flex flex-col lg:flex-row items-center justify-between px-2 lg:px-6 py-2 lg:py-0 relative w-full gap-2 lg:gap-0'>
            {/* Toggle Button */}
            <button
              onClick={togglePlayer}
              className='absolute -top-3 right-3 bg-red-500 border border-red-500 rounded-full p-1 text-slate-50 hover:text-white  transition-all flex items-center justify-center w-6 h-6 shadow-lg z-50'
              title='Minimize'
            >
              <X />
            </button>

            {/* Progress Bar Container - Positioned absolutely at top */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-slate-800 cursor-pointer group'>
              {/* The actual progress bar is handled by AudioPlayer's custom styles globally */}
            </div>

            {/* Track Info */}
            <div className='flex items-center gap-3 lg:gap-4 w-full lg:w-1/4 lg:min-w-[200px] justify-between lg:justify-start px-2'>
              <div className='flex items-center gap-3 lg:gap-4 overflow-hidden'>
                <div className='hidden md:block w-12 h-12 lg:w-14 lg:h-14 bg-slate-800 rounded border border-slate-600 overflow-hidden shrink-0 relative'>
                  {currentTrack.coverImage ? (
                    <Image
                      src={currentTrack.coverImage}
                      alt={currentTrack.title}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-slate-700 flex items-center justify-center'>
                      🎵
                    </div>
                  )}
                </div>
                <div className='flex flex-col min-w-0'>
                  <span className='text-sm font-bold text-white truncate'>
                    {currentTrack.title}
                  </span>
                  <span className='text-xs text-slate-400 font-mono truncate'>
                    {currentTrack.artist}
                  </span>
                </div>
              </div>
              <button className='text-slate-400 hover:text-[var(--color-terminal-accent)] transition-colors lg:ml-auto'>
                <Heart size={18} />
              </button>
            </div>

            {/* Center Controls */}
            <div className='flex flex-col items-center justify-center flex-1 w-full lg:w-auto mt-2 lg:mt-0'>
              <div className='flex items-center justify-center gap-4 mx-auto w-fit lg:gap-6 mb-1'>
                <button
                  onClick={() => setShufflePlay(!shufflePlay)}
                  className={cn(
                    'transition-colors',
                    shufflePlay
                      ? 'text-[var(--color-terminal-accent)]'
                      : 'text-slate-400 hover:text-white',
                  )}
                  title='Shuffle'
                >
                  <Shuffle size={16} className='lg:w-[18px] lg:h-[18px]' />
                </button>

                <button
                  onClick={prevTrack}
                  className='text-slate-300 hover:text-[var(--color-terminal-primary)] transition-colors'
                  title='Previous'
                >
                  <SkipBack size={20} className='lg:w-6 lg:h-6' />
                </button>

                <button
                  onClick={handlePlayPause}
                  className='w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--color-terminal-primary)] text-[#101014] flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(189,147,249,0.5)]'
                >
                  {isPlaying ? (
                    <Pause
                      size={20}
                      fill='currentColor'
                      className='lg:w-6 lg:h-6'
                    />
                  ) : (
                    <Play
                      size={20}
                      fill='currentColor'
                      className='ml-1 lg:w-6 lg:h-6'
                    />
                  )}
                </button>

                <button
                  onClick={() => nextTrack(shufflePlay)}
                  className='text-slate-300 hover:text-[var(--color-terminal-primary)] transition-colors'
                  title='Next'
                >
                  <SkipForward size={20} className='lg:w-6 lg:h-6' />
                </button>

                <button
                  onClick={() => setRepeat(!repeat)}
                  className={cn(
                    'transition-colors',
                    repeat
                      ? 'text-[var(--color-terminal-secondary)]'
                      : 'text-slate-400 hover:text-white',
                  )}
                  title='Repeat'
                >
                  <Repeat size={16} className='lg:w-[18px] lg:h-[18px]' />
                </button>
              </div>

              {/* Audio Player Logic (Hidden/Customized) */}
              <div className='w-full max-w-md px-4 lg:px-0 mx-auto'>
                <AudioPlayer
                  ref={playerRef}
                  autoPlay
                  src={currentTrack.audioUrl}
                  layout='horizontal'
                  onEnded={() => {
                    if (repeat) {
                      playerRef.current?.audio.current?.play()
                    } else {
                      nextTrack(shufflePlay)
                    }
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  showJumpControls={false}
                  customVolumeControls={[]}
                  customAdditionalControls={[]}
                  customProgressBarSection={[
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    'CURRENT_TIME' as any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    'PROGRESS_BAR' as any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    'DURATION' as any,
                  ]}
                  customControlsSection={[]} // Hide default controls, using custom ones above
                  className='!bg-transparent !shadow-none !p-0 audio-player-custom'
                />
              </div>
            </div>

            {/* Right Controls - Hidden on Mobile */}
            <div className='hidden lg:flex items-center justify-end gap-4 w-1/4 min-w-[200px]'>
              <span className='text-[10px] font-mono text-slate-500 px-2 py-0.5 border border-slate-700 rounded bg-black/20'>
                LOFI
              </span>
              <div className='flex items-center gap-2 group'>
                <button className='text-slate-400 hover:text-white'>
                  <Volume2 size={18} />
                </button>
                <div className='w-20 h-1 bg-slate-700 rounded-full cursor-pointer relative overflow-hidden'>
                  <div className='absolute left-0 top-0 bottom-0 w-2/3 bg-[var(--color-terminal-secondary)] group-hover:bg-[var(--color-terminal-accent)] transition-colors'></div>
                </div>
              </div>
              <button className='text-slate-400 hover:text-white ml-2'>
                <List size={20} />
              </button>
            </div>
          </footer>
        )}
      </div>

      {/* Hidden Player for Persistence */}
      {!isPlayerExpanded && (
        <div className='hidden'>
          <AudioPlayer
            ref={playerRef}
            autoPlay={false}
            src={currentTrack.audioUrl}
            onEnded={() => {
              if (repeat) {
                playerRef.current?.audio.current?.play()
              } else {
                nextTrack(shufflePlay)
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      )}
    </>
  )
}
