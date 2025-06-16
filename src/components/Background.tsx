'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlayer } from '~/providers/PlayerContext'

export const Background = () => {
  const { currentTrack } = usePlayer()

  return (
    <AnimatePresence>
      {currentTrack?.coverImage && (
        <motion.div
          key={currentTrack.coverImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute inset-0 -z-10'
        >
          <Image
            src={currentTrack.coverImage}
            alt='Background'
            fill
            className='object-cover'
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
