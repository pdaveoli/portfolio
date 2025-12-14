import { NextResponse } from 'next/server';
import { LastFmTrack } from "@/lib/lastfm";

interface CacheEntry {
    data: { recenttracks: { track: LastFmTrack[] } };
    timestamp: number;
}

const CACHE: Record<string, CacheEntry> = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
const LAST_FM_USERNAME = "oliverdf1";

export async function GET() {

    const cacheKey = `recent-tracks`;
    const now = Date.now();
    const cached = CACHE[cacheKey];

    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        return NextResponse.json(cached.data);
    }

    const apiKey = process.env.LASTFM_API_KEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${apiKey}&format=json&limit=10`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json() as { recenttracks: { track: LastFmTrack[] } };
    CACHE[cacheKey] = {
        data,
        timestamp: now,
    };
    return NextResponse.json(data);
}