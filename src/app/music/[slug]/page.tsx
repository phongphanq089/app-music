/* @next-codemod-ignore */
import { sanityFetch } from '~/sanity/config'

import {
  getAllCategoriesQuery,
  getAllTrackDeataillQuery,
} from '~/lib/query-sanity'
import CategoriedList from '~/components/CategoriedList'
import SliderBarLisMusic from '~/components/layout/list-music/SliderBarLisMusic'
import { Category, Track } from '~/types'
import { Background } from '~/components/Background'

export const dynamicParams = true

type Params = {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = params

  const tracks: Track[] = await sanityFetch<Track[]>(getAllTrackDeataillQuery, {
    slug: slug,
  })

  const categories: Category[] = await sanityFetch(getAllCategoriesQuery)

  return (
    <div className='p-6'>
      <Background slug={slug} />
      <SliderBarLisMusic track={tracks} />

      <div className='fixed right-3 top-3'>
        <CategoriedList categoriesList={categories} />
      </div>
    </div>
  )
}
