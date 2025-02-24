import type { MetadataRoute } from 'next'
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'

// Define route configurations with their properties
const routeConfigs: RouteConfig[] = [
  {
    path: '/cbh/about',
    priority: 1,
    changeFrequency: 'daily',
  },
  {
    path: '/about',
    priority: 0.8,
    changeFrequency: 'daily',
  },
]

// Types
type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

interface RouteConfig {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
}

interface SitemapEntry {
  url: string
  lastModified?: string | Date
  changeFrequency?: ChangeFrequency
  priority?: number
  alternates?: {
    languages?: Languages<string>
  }
}

// Helper function to generate sitemap entries
function generateSitemapEntries(configs: RouteConfig[]): SitemapEntry[] {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000'

  return configs.map((config) => ({
    url: `${baseUrl}${config.path}`,
    lastModified: new Date(),
    changeFrequency: config.changeFrequency,
    priority: config.priority,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Generate static routes
    const staticRoutes = generateSitemapEntries(routeConfigs)

    // You can add dynamic routes here for more information
    // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#dynamic-routes
    // const dynamicRoutes = await fetchDynamicRoutes()
    // return [...staticRoutes, ...dynamicRoutes]

    return staticRoutes
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [] // Return empty sitemap in case of error
  }
}
