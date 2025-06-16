'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type Track = {
  _id: string
  title: string
  artist: string
  audioUrl: string
  coverImage: string
}

type PlayerContextType = {
  currentTrack: Track | null
  trackList: Track[]
  playTrack: (track: Track, list?: Track[]) => void
  nextTrack: (shuffle?: boolean) => void
  prevTrack: () => void
  queue: Track[]
  setQueue: React.Dispatch<React.SetStateAction<Track[]>>
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const PlayerContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [trackList, setTrackList] = useState<Track[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const [queue, setQueue] = useState<Track[]>([])

  const playTrack = useCallback((track: Track, list?: Track[]) => {
    const listToUse = list || trackList
    const index = listToUse.findIndex((t) => t._id === track._id)
    if (index !== -1) {
      setTrackList(listToUse)
      setCurrentIndex(index)
      setCurrentTrack(track)
      setQueue(listToUse.slice(index + 1))
    }
  }, [])

  const nextTrack = useCallback(() => {
    if (!queue.length) return

    const next = queue[0]
    const newQueue = queue.slice(1)

    setCurrentTrack(next)
    setQueue(newQueue)
  }, [queue])

  const prevTrack = useCallback(() => {
    if (!trackList.length) return

    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length
    setCurrentIndex(prevIndex)
    setCurrentTrack(trackList[prevIndex])
  }, [currentIndex, trackList])

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        trackList,
        playTrack,
        nextTrack,
        prevTrack,
        queue,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerContextProvider')
  }
  return context
}
