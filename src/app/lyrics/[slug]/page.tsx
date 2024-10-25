import { fetchEntries, fetchEntry } from "@/lib/contentful";
import LyricsPage from "@/components/LyricsPage";

export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export async function generateStaticParams() {
  const entries = await fetchEntries("song");
  return entries.map((entry: any) => ({
    slug: entry.fields.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  // Await the params before using it
  const { slug } = await params; // This line is the change
  const songData = await fetchEntry("song", slug);
  if (!songData) {
    throw new Error("Song not found");
  }
  return <LyricsPage songData={songData} />;
}
