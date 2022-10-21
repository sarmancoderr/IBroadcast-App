export default function getArtwork (artworkId = '00000', height = 300) {
  return `https://artwork.ibroadcast.com/artwork/${artworkId}-${height}`
}
