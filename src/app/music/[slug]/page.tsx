import { TrackCard } from '~/components/TrackCard'

import { Metadata } from 'next'
import { sanityFetch, urlFor } from '~/sanity/config'
import Link from 'next/link'

export const dynamicParams = true

type Track = {
  _id: string
  title: string
  artist: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  audioUrl: string
  duration?: string
}

type Params = {
  params: {
    slug: string
  }
}

type Category = {
  _id: string
  title: string
  slug: string
}

export const getAllCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }
`

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `Category: ${params.slug}`,
  }
}

export async function generateStaticParams() {
  const query = `*[_type == "category"]{ "slug": slug.current }`
  const slugs: { slug: string }[] = await sanityFetch(query)

  return slugs.map((slug) => ({ slug: slug.slug }))
}

const categories: Category[] = await sanityFetch(getAllCategoriesQuery)

export default async function CategoryPage({ params }: Params) {
  const query = `
    *[_type == "track" && category->slug.current == $slug] {
      _id,
      title,
      artist,
      coverImage,
      "audioUrl": audioFile.asset->url,
      duration
    }
  `
  const tracks: Track[] = await sanityFetch<Track[]>(query, {
    slug: params.slug,
  })

  return (
    <div className='p-6'>
      {/* Menu categories */}
      <div className='flex gap-3 mb-6 overflow-x-auto'>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/music/${cat.slug}`}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
              cat.slug === params.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Track list */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tracks.map((track) => (
          <TrackCard
            key={track._id}
            tracks={tracks}
            track={{
              ...track,
              coverImage: urlFor(track.coverImage).width(400).height(300).url(),
            }}
          />
        ))}
      </div>
    </div>
  )
}
