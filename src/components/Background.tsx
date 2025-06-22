'use client'

import { useCategoriesStore } from '~/stores/useCategoriesStore'
import { useEffect, useState } from 'react'

interface Props {
  slug?: string
}

export const Background = ({ slug }: Props) => {
  const { categories } = useCategoriesStore()
  const [category, setCategory] = useState(() =>
    categories.find((c) => c.slug === slug)
  )

  // Update nếu categories được load sau
  useEffect(() => {
    setCategory(categories.find((c) => c.slug === slug))
  }, [categories, slug])

  if (!category) return null
  return (
    <div className='absolute inset-0 -z-10'>
      {category.isVideo && category.videoUrl ? (
        <video
          className='w-full h-full object-cover'
          src={category.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div
          className='w-full h-full bg-center bg-cover'
          style={{ backgroundImage: `url(${category.thumbnail})` }}
        />
      )}

      {/* <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' /> */}
    </div>
  )
}
