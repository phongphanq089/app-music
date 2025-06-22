import { Background } from '~/components/Background'
import CategoriedList from '~/components/CategoriedList'
import SliderBarLisMusic from '~/components/layout/list-music/SliderBarLisMusic'
import { getAllCategoriesQuery, getAllTracksQuery } from '~/lib/query-sanity'
import { sanityFetch } from '~/sanity/config'
import { Category, Track } from '~/types'

export default async function MusicPage() {
  const [tracks, categories] = await Promise.all([
    sanityFetch<Track[]>(getAllTracksQuery),
    sanityFetch<Category[]>(getAllCategoriesQuery),
  ])

  return (
    <div className='p-6'>
      <SliderBarLisMusic track={tracks} />
      <Background />
      <div className='fixed right-3 top-3'>
        <CategoriedList categoriesList={categories} />
      </div>
    </div>
  )
}
