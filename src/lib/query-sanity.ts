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

export const getAllTrackDeataillQuery = `
    *[_type == "track" && references(*[_type == "category" && slug.current == $slug]._id)] {
      _id,
      title,
      artist,
      coverImage,
      "audioUrl": audioFile.asset->url,
      duration
    }
  `

export const getAllCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
   "videoUrl": videoFile.asset->url,
    isVideo,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }
`
