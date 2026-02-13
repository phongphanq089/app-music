import CategoriedList from '~/components/CategoriedList'
import SliderBarLisMusic from '~/components/layout/list-music/SliderBarLisMusic'
import TerminalMain from '~/components/TerminalMain'
import { getAllCategoriesQuery, getAllTracksQuery } from '~/lib/query-sanity'
import { sanityFetch } from '~/sanity/config'
import { Category, Track } from '~/types'

export default async function MusicPage() {
  const [tracks, categories] = await Promise.all([
    sanityFetch<Track[]>(getAllTracksQuery),
    sanityFetch<Category[]>(getAllCategoriesQuery),
  ])

  return (
    <>
      <TerminalMain />
      <SliderBarLisMusic track={tracks} />

      {/* Category List - positioned absolute */}
      <div className='fixed right-3 top-3 z-50'>
        <CategoriedList categoriesList={categories} />
      </div>
    </>
  )
}
