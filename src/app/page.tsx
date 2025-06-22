import Link from 'next/link'
import { HoleBackground } from '~/components/ui/HoleBackground '

export default function Home() {
  return (
    <div className='h-screen w-full relative'>
      <HoleBackground className='absolute inset-0 flex items-center justify-center rounded-xl' />

      <Link
        href={'/music/all'}
        className='absolute top-1/2 left-1/2 -translate-1/2 z-10 cursor-pointer bg-linear-to-t from-sky-500 to-indigo-500 text-white flex items-center justify-center w-32 h-32 rounded-full p-4 text-center font-bold'
      >
        Listening music
      </Link>
    </div>
  )
}
