import { fetchEntries } from "@/lib/contentful";
import HomePage from "@/components/HomePage";

export const revalidate = 60; // revalidate every 60 seconds

async function getPopularSongs() {
  const res = await fetchEntries("song");
  return (
    res
      ?.sort((a: any, b: any) => b.fields.views - a.fields.views)
      .slice(0, 6) || []
  );
}

export default async function Page() {
  const popularSongs = await getPopularSongs();
  return <HomePage popularSongs={popularSongs} />;
}
