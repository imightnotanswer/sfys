// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { draftMode } from 'next/headers'
import { client } from './client'

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags: string[]
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode) {
    return client.fetch(query, params)
  }

  return client.fetch(query, params, {
    next: {
      tags,
      revalidate: 60,
    },
  })
}

// Live preview is handled automatically by Next.js and Sanity's client configuration
export function SanityLive() {
  return null
}
