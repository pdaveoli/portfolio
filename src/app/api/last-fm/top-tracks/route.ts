import { NextResponse } from 'next/server';
import { LastFmTrack } from "@/lib/lastfm";

interface CacheEntry {
    data: { toptracks: { track: LastFmTrack[] } };
    timestamp: number;
}

const CACHE: Record<string, CacheEntry> = {};
const CACHE_DURATION = 1000 * 60 * 20; // 20 minutes
const LAST_FM_USERNAME = "oliverdf1";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '7day';

    const cacheKey = `top-tracks-${period}`;
    const now = Date.now();
    const cached = CACHE[cacheKey];

    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        return NextResponse.json(cached.data);
    }

    const apiKey = process.env.LAST_FM_API_KEY || '4b4a033b6ccf7bc26bf99801d12502cf';
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LAST_FM_USERNAME}&api_key=${apiKey}&format=json&limit=10&period=${period}`;

    const res = await fetch(url);
    const data = await res.json() as { toptracks: { track: LastFmTrack[] } };
    CACHE[cacheKey] = {
        data,
        timestamp: now,
    };

    return NextResponse.json(data);
}
