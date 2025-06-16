import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from './env'

export const sanityClientFetch = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClientFetch)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}
export function getVideoUrl(assetRef: string) {
  if (!assetRef) return ''
  const [, id, extension] = assetRef.split('-') // file-abc123xyz456-mp4
  return `https://cdn.sanity.io/files/${sanityClientFetch.config().projectId}/${sanityClientFetch.config().dataset}/${id}.${extension}`
}

export const sanityFetch = async <T>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any> = {}
): Promise<T> => {
  return await sanityClientFetch.fetch(query, params)
}
