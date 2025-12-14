import { NextResponse } from 'next/server';
import { TrackInfo } from '@/lib/lastfm';
interface CacheEntry {
    data: TrackInfo;
    timestamp: number;
}

const CACHE: Record<string, CacheEntry> = {};
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 1 day

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const artist = searchParams.get('artist') || '';
    const track = searchParams.get('track') || '';

    const cacheKey = `track-info-${artist}-${track}`;
    const now = Date.now();
    const cached = CACHE[cacheKey];

    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        return NextResponse.json(cached.data);
    }

    const apiKey = process.env.LASTFM_API_KEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json() as { track: TrackInfo };
    CACHE[cacheKey] = {
        data: data.track,
        timestamp: now,
    };

    return NextResponse.json(data.track);
}