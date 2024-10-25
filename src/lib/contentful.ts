import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchEntries(content_type: string) {
  const entries = await client.getEntries({ content_type });
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${content_type}.`);
  return [];
}

export async function fetchEntry(content_type: string, slug: string) {
  const entries = await client.getEntries({
    content_type,
    "fields.slug": slug,
    limit: 1,
  });
  if (entries.items && entries.items.length > 0) return entries.items[0];
  console.log(`Error getting Entry for ${content_type} with slug: ${slug}.`);
  return null;
}
