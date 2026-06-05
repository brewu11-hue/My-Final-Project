
import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TT Group App',
    short_name: 'TTGroup',
    description: 'Efficient Waste Removal and Mining Management App',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
