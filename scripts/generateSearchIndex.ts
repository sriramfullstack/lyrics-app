import { config } from "dotenv";
import { createClient } from "contentful";
import fs from "fs/promises";
import path from "path";

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

// Validate environment variables
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error("Error: Missing required environment variables");
  console.error(
    "Make sure CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are set in .env.local"
  );
  process.exit(1);
}

async function main() {
  try {
    const client = createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: "song",
    });

    const searchIndex = entries.items.map((song: any) => ({
      title: song.fields.title,
      artist: song.fields.artist,
      slug: song.fields.slug,
      views: song.fields.views,
    }));

    const outputDir = path.join(process.cwd(), "public");
    await fs.writeFile(
      path.join(outputDir, "searchIndex.json"),
      JSON.stringify(searchIndex)
    );
    console.log("Search index generated successfully!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
