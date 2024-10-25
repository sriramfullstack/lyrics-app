import { fetchEntries } from "@/lib/contentful";
import HomePage from "@/components/HomePage";

export const revalidate = 60; // revalidate every 60 seconds

async function getPopularSongs() {
  const res = await fetchEntries("song");
  return (
    res
      ?.sort((a: any, b: any) => b.fields.views - a.fields.views)
      .slice(0, 6)
      .map((entry: any) => ({
        sys: entry.sys,
        fields: {
          title: entry.fields.title,
          artist: entry.fields.artist,
          views: entry.fields.views,
          slug: entry.fields.slug,
        },
      })) || []
  );
}

export default async function Page() {
  const popularSongs = await getPopularSongs();
  return <HomePage popularSongs={popularSongs} />;
}
