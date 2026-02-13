'use server'

import {
  getTracksByCategoryQuery,
  getTracksRangeQuery,
} from '~/lib/query-sanity'
import { sanityFetch } from '~/sanity/config'
import { Track } from '~/types'

export async function getMoreTracks(start: number, end: number) {
  try {
    const tracks = await sanityFetch<Track[]>(getTracksRangeQuery, {
      start,
      end,
    })
    return tracks
  } catch (error) {
    console.error('Error fetching more tracks:', error)
    return []
  }
}

const PAGE_SIZE = 10

export async function getTracksByPage(page: number, limit = PAGE_SIZE) {
  const start = (page - 1) * limit
  const end = start + limit
  return getMoreTracks(start, end)
}

export async function getTracksByCategory(
  slug: string,
  page: number,
  limit = PAGE_SIZE,
) {
  const start = (page - 1) * limit
  const end = start + limit

  try {
    const tracks = await sanityFetch<Track[]>(getTracksByCategoryQuery, {
      slug,
      start,
      end,
    })
    return tracks
  } catch (error) {
    console.error('Error fetching tracks by category:', error)
    return []
  }
}
