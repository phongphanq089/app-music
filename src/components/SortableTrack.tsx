'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash, ArrowUp, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export const SortableTrack = ({
  track,
  onPlay,
  onRemove,
  onPinTop,
  onPinBottom,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  track: any
  onPlay: () => void
  onRemove: () => void
  onPinTop: () => void
  onPinBottom: () => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex gap-3 items-center p-2 rounded bg-gray-800 cursor-pointer hover:bg-gray-700'
    >
      <Image
        src={track.coverImage}
        width={40}
        height={40}
        alt={track.title}
        className='rounded'
      />
      <div className='flex-1' onClick={onPlay}>
        <div className='font-medium'>{track.title}</div>
        <div className='text-sm text-gray-400'>{track.artist}</div>
      </div>
      <div className='flex gap-2'>
        <Button variant='ghost' size='icon' onClick={onPinTop}>
          <ArrowUp size={16} />
        </Button>
        <Button variant='ghost' size='icon' onClick={onPinBottom}>
          <ArrowDown size={16} />
        </Button>
        <Button variant='ghost' size='icon' onClick={onRemove}>
          <Trash size={16} />
        </Button>
        <GripVertical className='text-gray-400' size={16} />
      </div>
    </div>
  )
}
