import Image from 'next/image'
import { MusicPlayer } from '~/components/MusicPlayer'
import { PlayerContextProvider } from '~/providers/PlayerContext'

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlayerContextProvider>
      <div className='relative h-screen w-screen overflow-hidden flex flex-col bg-[#101014] text-slate-300 font-mono'>
        {/* Background Layer */}
        <div className='absolute inset-0 z-0'>
          { }
          <Image
            alt='Rainy window'
            className='w-full h-full object-cover opacity-60'
            src='/bg-pc.jpg'
            width={1920}
            height={1080}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/80 to-transparent'></div>
          <div className='absolute inset-0 bg-purple-900/10 mix-blend-overlay'></div>
        </div>

        {/* Scanline Effect */}
        <div className='scanline'></div>

        {/* Main Content Area */}
        <main className='relative z-10 flex-1 flex flex-col lg:flex-row p-2 lg:p-6 gap-4 lg:gap-6 h-full max-h-[calc(100vh-80px)] overflow-hidden'>
          {children}
        </main>

        {/* Footer Player */}
        <div className='relative z-20'>
          <MusicPlayer />
        </div>
      </div>
    </PlayerContextProvider>
  )
}
