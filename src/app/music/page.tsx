import Link from 'next/link'
import { TrackCard } from '~/components/TrackCard'
import { sanityFetch } from '~/sanity/config'

type Track = {
  _id: string
  title: string
  artist: string
  coverImage: string
  audioUrl: string
  category?: string
  duration?: string
}

export const getAllTracksQuery = `
  *[_type == "track"] | order(releaseDate desc) {
    _id,
    title,
    artist,
    "coverImage": coverImage.asset->url,
    "audioUrl": audioFile.asset->url,
    "category": category->title,
    duration,
    isFeatured
  }
`

export const getAllCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }
`

type Category = {
  _id: string
  title: string
  slug: string
}

export default async function MusicPage() {
  // const tracks: Track[] = await sanityFetch<Track[]>(getAllTracksQuery)

  const [tracks, categories] = await Promise.all([
    sanityFetch<Track[]>(getAllTracksQuery),
    sanityFetch<Category[]>(getAllCategoriesQuery),
  ])

  return (
    <div className='p-6'>
      {/* Category menu */}
      <div className='flex gap-3 mb-6 overflow-x-auto'>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/music/${cat.slug}`}
            className='bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm whitespace-nowrap'
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Track list */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tracks.map((track) => (
          <TrackCard key={track._id} track={track} tracks={tracks} />
        ))}
      </div>
    </div>
  )
}
