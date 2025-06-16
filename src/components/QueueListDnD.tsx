'use client'

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { usePlayer } from '~/providers/PlayerContext'
import { SortableTrack } from './SortableTrack'

export const QueueListDnD = () => {
  const { queue, setQueue, playTrack, trackList } = usePlayer()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = queue.findIndex((item) => item._id === active.id)
    const newIndex = queue.findIndex((item) => item._id === over.id)

    setQueue(arrayMove(queue, oldIndex, newIndex))
  }

  const removeTrack = (id: string) => {
    setQueue(queue.filter((t) => t._id !== id))
  }

  const pinTop = (id: string) => {
    const track = queue.find((t) => t._id === id)
    if (track) {
      setQueue([track, ...queue.filter((t) => t._id !== id)])
    }
  }

  const pinBottom = (id: string) => {
    const track = queue.find((t) => t._id === id)
    if (track) {
      setQueue([...queue.filter((t) => t._id !== id), track])
    }
  }

  return (
    <div className='p-4 bg-gray-900 rounded shadow text-white space-y-3'>
      <h2 className='text-lg font-semibold mb-2'>Queue</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={queue.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          {queue.map((track) => (
            <SortableTrack
              key={track._id}
              track={track}
              onPlay={() => playTrack(track, trackList)}
              onRemove={() => removeTrack(track._id)}
              onPinTop={() => pinTop(track._id)}
              onPinBottom={() => pinBottom(track._id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
