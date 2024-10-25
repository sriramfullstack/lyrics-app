import { fetchEntries, fetchEntry } from "@/lib/contentful";
import LyricsPage, { SongData } from "@/components/LyricsPage";

export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export async function generateStaticParams() {
  const entries = await fetchEntries("song");
  return entries.map((entry: any) => ({
    slug: entry.fields.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const response = await params;
  const songEntry = await fetchEntry("song", response.slug);
  if (!songEntry) {
    throw new Error("Song not found");
  }

  const songData: SongData = {
    sys: { id: songEntry.sys.id },
    fields: {
      title: songEntry.fields.title as string,
      artist: songEntry.fields.artist as string,
      lyrics: songEntry.fields.lyrics as string,
      views: songEntry.fields.views as number,
      slug: songEntry.fields.slug as string,
    },
  };

  return <LyricsPage songData={songData} />;
}
