export async function getYouTubeViews(videoId: string): Promise<number> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items[0]) {
      return parseInt(data.items[0].statistics.viewCount);
    }
    return 0;
  } catch (error) {
    console.error("Error fetching YouTube views:", error);
    return 0;
  }
}
