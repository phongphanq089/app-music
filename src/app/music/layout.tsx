// app/music/layout.tsx

import { Background } from '~/components/Background'
import { MusicPlayer } from '~/components/MusicPlayer'
import { QueueListDnD } from '~/components/QueueListDnD'
import { PlayerContextProvider } from '~/providers/PlayerContext'

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlayerContextProvider>
      <div className='relative h-screen pb-24 overflow-hidden'>
        <Background />
        {/* backdrop-blur-md */}
        <div className='relative z-10 bg-black/40 text-white  min-h-screen'>
          {children}
        </div>
        <MusicPlayer />
        <div className='fixed bottom-[100px] right-4 w-72 z-40'>
          {/* <QueueList /> */}
          <QueueListDnD />
        </div>
      </div>
    </PlayerContextProvider>
  )
}
