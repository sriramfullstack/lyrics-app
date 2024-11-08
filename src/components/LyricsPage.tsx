"use client";

import { useState, useEffect } from "react";
import { ChevronUp, Share2, Copy, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { getYouTubeViews } from "@/lib/youtube";

export interface SongData {
  sys: { id: string };
  fields: {
    title: string;
    artist: string;
    lyrics: string;
    views: number;
    slug: string;
    youtubeId?: string;
  };
}

interface LyricsPageProps {
  songData: SongData;
}

export default function LyricsPage({ songData }: LyricsPageProps) {
  const [fontSize, setFontSize] = useState(18);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [youtubeViews, setYoutubeViews] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch YouTube views if video ID exists
    const fetchYouTubeViews = async () => {
      if (songData.fields.youtubeId) {
        const views = await getYouTubeViews(songData.fields.youtubeId);
        setYoutubeViews(views);
      }
    };

    fetchYouTubeViews();
  }, [songData.fields.youtubeId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(songData.fields.lyrics);
    toast.success("Lyrics copied to clipboard!");
  };

  const shareLyrics = () => {
    if (navigator.share) {
      navigator.share({
        title: `${songData.fields.title} - ${songData.fields.artist}`,
        text: `Check out the lyrics for ${songData.fields.title} by ${songData.fields.artist}`,
        url: window.location.href,
      });
    } else {
      toast.error("Sharing is not supported on this device");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-white transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {songData.fields.title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
            {songData.fields.artist}
          </h2>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            {youtubeViews !== null && (
              <p>{youtubeViews.toLocaleString()} YouTube views</p>
            )}
          </div>
          {songData.fields.youtubeId && (
            <div className="mt-6 flex justify-center">
              <div className="relative w-[500px] h-[315px]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src={`https://www.youtube.com/embed/${songData.fields.youtubeId}`}
                  title={`${songData.fields.title} - ${songData.fields.artist}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 rounded-lg shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Font Size:</span>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={12}
                max={24}
                step={1}
                className="w-32"
              />
              <span className="text-gray-300">{fontSize}px</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="icon" onClick={copyToClipboard} className="p-2">
                <Copy className="h-5 w-5 text-gray-300" />
              </Button>
              <Button variant="icon" onClick={shareLyrics} className="p-2">
                <Share2 className="h-5 w-5 text-gray-300" />
              </Button>
            </div>
          </div>
          <div
            className="bg-black/20 p-6 rounded-lg whitespace-pre-wrap"
            style={{ fontSize: `${fontSize}px` }}
          >
            {songData.fields.lyrics}
          </div>
        </motion.div>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-full shadow-lg"
              onClick={scrollToTop}
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
