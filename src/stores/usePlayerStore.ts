import { create } from 'zustand'

type Track = {
  _id: string
  title: string
  artist: string
  audioUrl: string
  coverImage: string
}

type PlayerStore = {
  currentTrack: Track | null
  trackList: Track[]
  currentIndex: number
  queue: Track[]
  playTrack: (track: Track, list?: Track[]) => void
  nextTrack: (shuffle?: boolean) => void
  prevTrack: () => void
  setQueue: (queue: Track[]) => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  trackList: [],
  currentIndex: -1,
  queue: [],
  playTrack: (track, list) => {
    console.log(track, get().trackList, '======>')
    const listToUse = list || get().trackList
    const index = listToUse.findIndex((t) => t._id === track._id)
    if (index !== -1) {
      set({
        trackList: listToUse,
        currentIndex: index,
        currentTrack: track,
        queue: listToUse.slice(index + 1),
      })
    }
  },

  nextTrack: (shuffle?: boolean) => {
    const { queue, trackList, currentTrack } = get()

    if (!trackList.length) return

    if (shuffle) {
      const remainingTracks = trackList.filter(
        (t) => t._id !== currentTrack?._id
      )
      const random =
        remainingTracks[Math.floor(Math.random() * remainingTracks.length)]

      if (random) {
        const index = trackList.findIndex((t) => t._id === random._id)
        const newQueue = trackList.filter((_, i) => i !== index)
        set({
          currentIndex: index,
          currentTrack: random,
          queue: newQueue,
        })
      }
    } else {
      if (!queue.length) {
        // 🟡 Nếu hết bài, quay lại từ đầu
        set({
          currentIndex: 0,
          currentTrack: trackList[0],
          queue: trackList.slice(1),
        })
        return
      }

      const next = queue[0]
      const newQueue = queue.slice(1)
      const index = trackList.findIndex((t) => t._id === next._id)

      set({
        currentIndex: index,
        currentTrack: next,
        queue: newQueue,
      })
    }
  },
  prevTrack: () => {
    const { currentIndex, trackList } = get()
    if (!trackList.length) return

    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length
    const newQueue = trackList.slice(prevIndex + 1)

    set({
      currentIndex: prevIndex,
      currentTrack: trackList[prevIndex],
      queue: newQueue, // ✅ cập nhật queue lại từ vị trí mới
    })
  },

  setQueue: (queue) => set({ queue }),
}))
