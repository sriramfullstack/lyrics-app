import { createClient, Entry, EntrySkeletonType } from "contentful";

// Add validation for environment variables
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Missing required environment variables CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN"
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export interface SongFields extends EntrySkeletonType {
  title: string;
  artist: string;
  lyrics: string;
  views: number;
  slug: string;
  youtubeId?: string;
}

export type SongEntry = Entry<SongFields>;

export async function fetchEntries(content_type: string): Promise<SongEntry[]> {
  const entries = await client.getEntries<SongFields>({ content_type });
  return entries.items;
}

export async function fetchEntry(
  content_type: string,
  slug: string
): Promise<SongEntry | null> {
  const entries = await client.getEntries<SongFields>({
    content_type,
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0] || null;
}
