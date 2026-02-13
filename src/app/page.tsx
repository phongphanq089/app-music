import Link from 'next/link'
import AnimatedButton from '~/components/ui/AnimatedButton'
import Prism from '~/components/ui/Prism'

export default function Home() {
  return (
    <div className='h-screen w-full relative bg-black'>
      <Prism
        animationType='rotate'
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0}
        glow={1}
      />

      <div className='absolute top-1/2 left-1/2 -translate-1/2 z-10'>
        <AnimatedButton>
          <Link href={'/music/all'}>Play Music</Link>
        </AnimatedButton>
      </div>
    </div>
  )
}
