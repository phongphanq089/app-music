export type Track = {
  _id: string
  title: string
  artist: string
  coverImage: string
  audioUrl: string
  category?: string
  duration?: string
}

export type Category = {
  _id: string
  title: string
  slug: string
  isVideo?: boolean
  videoUrl?: string
  thumbnail?: string
}
