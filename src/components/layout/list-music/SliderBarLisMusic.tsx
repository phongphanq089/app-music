'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '~/stores/usePlayerStore'
import { Loader2, X, ListMusic } from 'lucide-react'
import { getTracksByPage } from '~/actions/music'
import { Track } from '~/types'
import { cn } from '~/lib/utils'
import { HeadphoneIcon } from '~/components/elements/IconUi'

interface SliderBarLisMusicProps {
  track: Track[]
  onLoadMore?: (page: number) => Promise<Track[]>
}

const SliderBarLisMusic = ({ track, onLoadMore }: SliderBarLisMusicProps) => {
  const { currentTrack, playTrack } = usePlayerStore()
  const [trackList, setTrackList] = useState<Track[]>(track)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Mobile drawer state
  const [isOpen, setIsOpen] = useState(false)

  const handleLoadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const nextPage = page + 1
      const newTracks = onLoadMore
        ? await onLoadMore(nextPage)
        : await getTracksByPage(nextPage)

      if (newTracks.length === 0) {
        setHasMore(false)
      } else {
        setTrackList((prev) => {
          const uniqueNewTracks = newTracks.filter(
            (newTrack) => !prev.some((track) => track._id === newTrack._id),
          )

          if (uniqueNewTracks.length === 0 && newTracks.length > 0) {
            // New tracks were all duplicates, which might mean we reached end or overlapping data
            // To prevent infinite loop if we keep getting duplicates, maybe check length?
            // But for now, just adding unique ones is enough to solve key error.
            // If we get 10 duplicates, we might want to try next page?
            // Simplest is to just append unique ones.
          }

          return [...prev, ...uniqueNewTracks]
        })
        setPage(nextPage)
      }
    } catch (error) {
      console.error('Error loading more tracks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore()
        }
      },
      { threshold: 1.0 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [handleLoadMore, hasMore, loading, trackList.length])

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-24 right-0 z-50 p-2 bg-[var(--color-terminal-primary)] text-black rounded-l-md shadow-[0_0_15px_rgba(189,147,249,0.5)] hover:bg-white transition-all transform hover:-translate-x-1'
      >
        {isOpen ? <X size={20} /> : <ListMusic size={20} />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Container / Drawer */}
      <div
        className={cn(
          'glass-panel rounded-lg flex flex-col shadow-2xl overflow-hidden border border-slate-800 flex-none bg-[#101014]/95',
          'fixed inset-y-0 right-0 z-50 w-80 h-full transition-transform duration-300 ease-in-out', // Mobile styles
          isOpen ? 'translate-x-0' : 'translate-x-full', // Mobile toggle
          'lg:static lg:w-96 lg:h-full lg:translate-x-0', // Desktop styles
        )}
      >
        {/* Terminal Header */}
        <div className='bg-[#21222c] p-2 flex items-center justify-between border-b border-slate-800 shrink-0'>
          <div className='flex items-center gap-2 px-2'>
            <span className='material-icons text-sm text-slate-400'>
              terminal
            </span>
            <span className='text-xs font-bold text-slate-300'>
              playlist.sh
            </span>
          </div>
          <div className='flex gap-1.5 px-2'>
            <span className='w-2.5 h-2.5 rounded-full bg-slate-600'></span>
            <span className='w-2.5 h-2.5 rounded-full bg-slate-600'></span>
          </div>
        </div>

        {/* Terminal Command Line */}
        <div className='p-3 bg-black/20 border-b border-slate-800 text-xs font-mono shrink-0'>
          <div className='flex gap-2 items-center'>
            <span className='text-secondary'>➜</span>
            <span className='text-accent'>~</span>
            <span className='text-slate-400'>ls -la ./tracks --sort=mood</span>
          </div>
          <div className='mt-1 text-slate-500 pl-4'>
            total {trackList.length} files
          </div>
        </div>

        {/* Track List */}

        <div className='flex-1 overflow-y-auto p-2 space-y-1 scroll-custom'>
          {trackList.length === 0 ? (
            <p className='text-sm text-gray-500 ml-5 py-4'>
              No tracks found...
            </p>
          ) : (
            <ul className='space-y-1 pb-4'>
              {trackList.map((track, index) => (
                <li
                  key={track._id}
                  onClick={() => {
                    playTrack(track, trackList)
                    if (window.innerWidth < 1024) setIsOpen(false) // Close on mobile click
                  }}
                  className={`group flex items-center p-2 rounded cursor-pointer transition-all border-l-2 ${
                    currentTrack?._id === track._id
                      ? 'bg-slate-800/50 border-primary'
                      : 'hover:bg-slate-800/30 border-transparent hover:border-slate-600'
                  }`}
                >
                  <div
                    className={`w-6 text-center mr-2 text-xs font-mono ${
                      currentTrack?._id === track._id
                        ? 'text-pink-500'
                        : 'text-slate-600'
                    }`}
                  >
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div
                      className={`text-sm font-medium truncate ${
                        currentTrack?._id === track._id
                          ? 'text-pink-500'
                          : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {track.title}
                    </div>
                    <div className='text-xs text-slate-500 group-hover:text-slate-400 flex gap-2'>
                      <span>{track.artist}</span>
                    </div>
                  </div>
                  {currentTrack?._id === track._id && (
                    <HeadphoneIcon className='w-4 h-4 text-primary animate-pulse ml-2' />
                  )}
                </li>
              ))}
              {/* Observer Target for Infinite Scroll */}
              <div
                ref={observerTarget}
                className='flex justify-center p-4 w-full'
              >
                {loading && (
                  <Loader2 className='w-5 h-5 animate-spin text-primary' />
                )}
              </div>
            </ul>
          )}
        </div>

        {/* Terminal Footer Info */}
        <div className='p-2 bg-black/40 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between shrink-0'>
          <span>-- INSERT --</span>
          <span>
            {trackList.length} / {hasMore ? '???' : trackList.length}
          </span>
        </div>
      </div>
    </>
  )
}

export default SliderBarLisMusic
