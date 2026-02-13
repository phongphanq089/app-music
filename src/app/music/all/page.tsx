import CategoriedList from '~/components/CategoriedList'
import SliderBarLisMusic from '~/components/layout/list-music/SliderBarLisMusic'
import TerminalMain from '~/components/TerminalMain'
import { getAllCategoriesQuery, getTracksRangeQuery } from '~/lib/query-sanity'
import { sanityFetch } from '~/sanity/config'
import { Category, Track } from '~/types'
import { getTracksByPage } from '~/actions/music'

export const dynamic = 'force-dynamic'

export default async function AllMusicPage() {
  const [tracks, categories] = await Promise.all([
    sanityFetch<Track[]>(getTracksRangeQuery, { start: 0, end: 10 }),
    sanityFetch<Category[]>(getAllCategoriesQuery),
  ])

  return (
    <>
      <TerminalMain />

      {/* Pass server action as prop to client component */}
      <SliderBarLisMusic
        track={tracks}
        onLoadMore={async (page) => {
          'use server'
          return getTracksByPage(page)
        }}
      />

      {/* Category List - kept for functionality, might need restyling or positioning */}
      <div className='fixed right-3 top-3 z-50'>
        <CategoriedList categoriesList={categories} />
      </div>
    </>
  )
}
