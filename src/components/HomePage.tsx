"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, Music, Headphones, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Song {
  sys: { id: string };
  fields: {
    title: string;
    artist: string;
    views: number;
    slug: string;
  };
}

interface HomeProps {
  popularSongs: Song[];
}

export default function HomePage({ popularSongs }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            LyricsFinder
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Discover the words to your favorite songs
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search for songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow text-lg bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white">
              <Search className="mr-2" />
              Search
            </Button>
          </div>
        </motion.div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-200 flex items-center justify-center">
          <TrendingUp className="mr-2" />
          Top Hits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularSongs.map((song, index) => (
            <motion.div
              key={song.sys.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300 ease-in-out">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-pink-300 transition-colors duration-300">
                    {song.fields.title}
                  </h3>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    {song.fields.artist}
                  </p>
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <Headphones className="mr-2 h-5 w-5" />
                    <span>{song.fields.views.toLocaleString()} views</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 bg-gradient-to-r from-pink-500/20 to-violet-500/20 group-hover:from-pink-500/30 group-hover:to-violet-500/30 transition-all duration-300">
                  <Link href={`/lyrics/${song.fields.slug}`} className="w-full">
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 group-hover:border-white/50 transition-colors duration-300">
                      <Music className="mr-2 h-5 w-5" />
                      View Lyrics
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
