import Image from 'next/image'
import { cn } from '~/lib/utils'

export const HeadphoneIcon = ({ className }: { className?: string }) => {
  return (
    <div className={cn('w-[32px] h-auto', className)}>
      <Image src={'/headphone.png'} width={100} height={100} alt='APP MUSIC' />
    </div>
  )
}
