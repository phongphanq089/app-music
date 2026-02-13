/* @next-codemod-ignore */
import { sanityFetch } from '~/sanity/config'

import {
  getAllCategoriesQuery,
  getTracksByCategoryQuery,
} from '~/lib/query-sanity'
import CategoriedList from '~/components/CategoriedList'
import SliderBarLisMusic from '~/components/layout/list-music/SliderBarLisMusic'
import { Category, Track } from '~/types'
import { Background } from '~/components/Background'

export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

import { getTracksByCategory } from '~/actions/music'

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params

  const tracks: Track[] = await sanityFetch<Track[]>(getTracksByCategoryQuery, {
    slug: slug,
    start: 0,
    end: 10,
  })

  const categories: Category[] = await sanityFetch(getAllCategoriesQuery)

  return (
    <div className='p-6'>
      <Background slug={slug} />
      <SliderBarLisMusic
        track={tracks}
        onLoadMore={async (page) => {
          'use server'
          return getTracksByCategory(slug, page)
        }}
      />

      <div className='fixed right-3 top-3'>
        <CategoriedList categoriesList={categories} />
      </div>
    </div>
  )
}
