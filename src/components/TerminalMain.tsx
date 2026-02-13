'use client'
import React from 'react'
import { Timer } from 'lucide-react'
import { usePlayerStore } from '~/stores/usePlayerStore'

import Grainient from './Grainient'

const TerminalMain = () => {
  const { currentTrack } = usePlayerStore()

  return (
    <div className='flex-1 flex flex-col gap-4 lg:gap-6 min-w-0 h-full overflow-hidden'>
      {/* Top Status Bar */}
      <div className='glass-panel rounded-lg p-3 lg:p-4 flex justify-between items-center text-[10px] lg:text-xs shadow-lg shrink-0'>
        <div className='flex gap-2 lg:gap-4 font-mono truncate'>
          <span className='text-[var(--color-terminal-secondary)] shrink-0'>
            user@lofi
          </span>
          <span className='text-slate-500 hidden sm:inline'>~/music/vibes</span>
          <span className='text-[var(--color-terminal-accent)] truncate'>
            git:(master)
          </span>
        </div>
        <div className='flex gap-2 lg:gap-4 items-center shrink-0'>
          <div className='flex items-center gap-1.5 lg:gap-2'>
            <span className='w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-red-500'></span>
            <span className='w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-yellow-500'></span>
            <span className='w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500'></span>
          </div>
          <span className='text-slate-500 hidden sm:inline'>v.2.0.4</span>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className='flex-1 glass-panel rounded-lg p-4 lg:p-8 flex flex-col justify-center items-center relative shadow-2xl overflow-hidden group min-h-[300px]'>
        <div className='absolute inset-0 w-full h-full '>
          {currentTrack?.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt='Album Art'
              className='w-full h-full object-cover  opacity-80 transition-all duration-500'
              src={currentTrack.coverImage}
            />
          ) : (
            // <div className='w-full h-full bg-gradient-to-br from-purple-900 to-black flex items-center justify-center'>
            //   <span className='text-4xl'>🎵</span>
            // </div>
            <div
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <Grainient
                color1='#FF9FFC'
                color2='#5227FF'
                color3='#B19EEF'
                timeSpeed={0.25}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={0}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.1}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}
              />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className='z-10 space-y-1 lg:space-y-2 px-4 max-w-2xl absolute bottom-4 left-4'>
          <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-transparent rounded-lg bg-gradient-to-r from-[var(--color-terminal-primary)] via-[var(--color-terminal-accent)] to-[var(--color-terminal-secondary)] crt-flicker tracking-tighter  max-w-full py-4 px-4'>
            {currentTrack?.title || 'Waiting for input...'}
          </h2>
          <p className='text-[var(--color-terminal-secondary)] text-xs sm:text-sm font-medium tracking-wide truncate max-w-full'>
            <span className='text-pink-500'>const</span> artist ={' '}
            <span className='text-yellow-300'>
              &quot;{currentTrack?.artist || 'Unknown'}&quot;
            </span>
            ;
          </p>
        </div>

        {/* Bouncing Bars Visualizer */}
        {/* {currentTrack && (
          <div className='w-full h-8 lg:h-16 mt-6 lg:mt-12 flex items-end justify-center gap-[1px] lg:gap-[2px] opacity-80'>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1 lg:w-1.5 rounded-t-sm',
                  i % 3 === 0
                    ? 'bg-[var(--color-terminal-primary)]'
                    : i % 3 === 1
                      ? 'bg-[var(--color-terminal-accent)]'
                      : 'bg-[var(--color-terminal-secondary)]',
                )}
                style={{
                  height: `${Math.max(20, Math.random() * 100)}%`,
                  animation: `bounce ${0.8 + Math.random()}s infinite`,
                }}
              ></div>
            ))}
          </div>
        )} */}
      </div>

      {/* Focus Mode Panel */}
      <div className='glass-panel rounded-lg p-3 lg:p-4 flex justify-between items-center border-l-4 border-l-[var(--color-terminal-secondary)] shrink-0 max-sm:flex-col max-sm:gap-3 max-sm:items-stretch'>
        <div className='flex flex-col max-sm:items-center'>
          <span className='text-[10px] lg:text-xs text-slate-400 uppercase tracking-widest'>
            Focus Mode
          </span>
          <div className='text-xl lg:text-2xl font-bold text-white font-mono flex items-center gap-2'>
            <Timer className='text-[var(--color-terminal-secondary)] w-4 h-4 lg:w-5 lg:h-5' />
            24:59
          </div>
        </div>
        <div className='flex gap-2 justify-center'>
          <button className='px-3 py-1.5 lg:px-4 lg:py-1.5 bg-black/50 hover:bg-[var(--color-terminal-secondary)]/20 hover:text-[var(--color-terminal-secondary)] border border-slate-700 hover:border-[var(--color-terminal-secondary)] rounded text-[10px] lg:text-xs transition-colors whitespace-nowrap'>
            SHORT BREAK
          </button>
          <button className='px-3 py-1.5 lg:px-4 lg:py-1.5 bg-black/50 hover:bg-[var(--color-terminal-primary)]/20 hover:text-[var(--color-terminal-primary)] border border-slate-700 hover:border-[var(--color-terminal-primary)] rounded text-[10px] lg:text-xs transition-colors whitespace-nowrap'>
            LONG BREAK
          </button>
          <button className='px-3 py-1.5 lg:px-4 lg:py-1.5 bg-[var(--color-terminal-secondary)] text-black font-bold hover:bg-[var(--color-terminal-secondary)]/80 rounded text-[10px] lg:text-xs transition-colors whitespace-nowrap'>
            START
          </button>
        </div>
      </div>
    </div>
  )
}

export default TerminalMain
