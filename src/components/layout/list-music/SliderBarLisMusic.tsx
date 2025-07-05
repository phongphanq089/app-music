'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { usePlayerStore } from '~/stores/usePlayerStore'
import { Track } from '~/types'
import { AnimatePresence, motion } from 'motion/react'
import { ScrollArea } from '~/components/ui/scroll-area'
import { HeadphoneIcon } from '~/components/elements/IconUi'

const SliderBarLisMusic = ({ track }: { track: Track[] }) => {
  const { trackList, playTrack, currentTrack } = usePlayerStore()
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    usePlayerStore.setState({ trackList: track })
  }, [track])

  // console.log(trackList)
  return (
    <div className='relative flex'>
      <Button
        onClick={toggleSidebar}
        className='absolute -left-5 top-4 z-10 shadow rounded-full p-1 border  '
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key='sidebar'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='w-[400px] shadow  rounded-xl h-[75vh] sm:h-[80vh] overflow-hidden bg-white/30 backdrop-blur'
          >
            <ScrollArea className='w-full h-full px-6 py-4'>
              {trackList.length === 0 ? (
                <p className='text-sm text-gray-900 ml-5'>
                  Không có bài hát nào
                </p>
              ) : (
                <ul className='space-y-3 text-sm'>
                  {trackList.map((track) => (
                    <li
                      key={track._id}
                      onClick={() => playTrack(track)}
                      className={`flex border  items-center justify-between cursor-pointer py-2 px-3 rounded-xl hover:bg-gray-300 transition  relative pr-12 ${
                        currentTrack?._id === track._id
                          ? 'bg-linear-to-t from-sky-500 to-indigo-500 text-white'
                          : 'bg-white text-black '
                      }`}
                    >
                      <div>
                        <div className='line-clamp-2'>{track.title}</div>
                        <div className='text-xs '>{track.artist}</div>
                      </div>
                      <HeadphoneIcon className='w-9 h-9 absolute right-2 top-1/2 -translate-y-1/2' />
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SliderBarLisMusic
