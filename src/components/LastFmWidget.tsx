"use client";
import { useEffect, useState, useRef } from "react";
import {LastFmTrack, TrackInfo} from "@/lib/lastfm";
import { Music } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
interface CacheData {
    [key: string]: LastFmTrack[];
}

export default function LastFmWidget() {
    const [recentTracks, setRecentTracks] = useState<LastFmTrack[]>([]);
    const [topTracks, setTopTracks] = useState<LastFmTrack[]>([]);
    const [topTrackImages, setTopTrackImages] = useState<Record<string, string | null>>({});
    const cache = useRef<CacheData>({});
    const [period, setPeriod] = useState<string>("7day");

    useEffect(() => {
        async function getTopTracks(period: string) {
            try {
                const cacheKey = 'top-tracks-' + period;
                if (cache.current[cacheKey]) {
                    const tracks = cache.current[cacheKey];
                    setTopTracks(tracks);
                    const images: Record<string, string | null> = {};
                    await Promise.all(tracks.map(async (track: LastFmTrack) => {
                        const artistName = track.artist.name || track.artist["#text"] || "";
                        const res = await fetch(`/api/last-fm/get-track-info?artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(track.name)}`);
                        const info: TrackInfo = await res.json();
                        const img = info.album?.image?.find((i) => i.size === "large" || i.size === "extralarge");
                        images[`${artistName}-${track.name}`] = img?.["#text"] || null;
                    }));
                    setTopTrackImages(images);
                    return tracks;
                }
                const res = await fetch(`/api/last-fm/top-tracks?period=${period}`);
                const data = await res.json() as { toptracks: { track: LastFmTrack[] } };
                const tracks = data.toptracks.track;
                cache.current[cacheKey] = tracks;
                console.log(tracks);

                const images: Record<string, string | null> = {};
                await Promise.all(tracks.map(async (track: LastFmTrack) => {
                    const artistName = track.artist.name || track.artist["#text"] || "";
                    const res = await fetch(`/api/last-fm/get-track-info?artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(track.name)}`);
                    const info: TrackInfo = await res.json();
                    const img = info.album?.image?.find((i) => i.size === "large" || i.size === "extralarge");
                    images[`${artistName}-${track.name}`] = img?.["#text"] || null;
                }));
                setTopTrackImages(images);
                setTopTracks(tracks);

                return tracks;
            } catch (error) {
                console.error("Error fetching top tracks:", error);
                return [];
            }
        }

        async function getRecentTracks() {
            try {
                const cacheKey = 'recent-tracks';
                if (cache.current[cacheKey]) {
                    setRecentTracks(cache.current[cacheKey]);
                    return cache.current[cacheKey];
                }
                const res = await fetch('/api/last-fm/recently-played');
                const data = await res.json() as { recenttracks: { track: LastFmTrack[] } };
                const tracks = data.recenttracks.track;
                cache.current[cacheKey] = tracks;
                console.log(tracks);
                setRecentTracks(tracks);
                return tracks;
            } catch (error) {
                console.error("Error fetching recent tracks:", error);
                return [];
            }
        }

        getTopTracks(period);
        getRecentTracks();
    }, [period]); // Added period to dependency array

    function getTrackImage(track: LastFmTrack): string | null {
        const image = track.image?.find(img => img.size === "large" || img.size === "extralarge");
        const url = image?.["#text"];

        if (!url || url.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
            return null;
        }
        return url;
    }

    function getTopTrackImage(track: LastFmTrack): string | null {
        const artistName = track.artist.name || track.artist["#text"] || "";
        const url = topTrackImages[`${artistName}-${track.name}`];
        if (!url || url.includes("2a96cbd8b46e442fc41c2b86b821562f")) return null;
        return url;
    }


    return (
        <div className="grid gap-6 max-w-7xl w-full p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            { recentTracks.length > 0 ? (
                    <div>
                        <h2 className="p-2 mb-2">Recent Tracks:</h2>
                        <div className="flex flex-col gap-2">
                            {recentTracks.map((track, index) => (
                                <div key={index} className="p-2 border rounded flex flex-row">
                                    {getTrackImage(track) ? (
                                        <img src={getTrackImage(track)!} alt={track.name} className="w-12 h-12 object-cover mr-2 rounded"  />
                                    ) : (
                                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center mr-2">
                                            <Music className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate"><strong>{track.artist["#text"]}</strong> - {track.name}</p>
                                        {track.date && <p className="text-sm text-gray-500 truncate">Played at: {track.date["#text"]}</p>}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                ) : (
                    <p>No recent tracks found.</p>
                )
            }
            {
                topTracks.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between p-2 mb-2">
                        <h2>Top Tracks:</h2>
                        <Select onValueChange={(value) => setPeriod(value)} defaultValue={period}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Time Period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Time Period</SelectLabel>
                                    <SelectItem value="7day">Last 7 Days</SelectItem>
                                    <SelectItem value="1month">Last 1 Month</SelectItem>
                                    <SelectItem value="3month">Last 3 Months</SelectItem>
                                    <SelectItem value="6month">Last 6 Months</SelectItem>
                                    <SelectItem value="12month">Last 12 Months</SelectItem>
                                    <SelectItem value="overall">All Time</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            {topTracks.map((track, index) => (
                                <div key={index} className="p-2 border rounded flex flex-row">
                                    {getTopTrackImage(track) ? (
                                        <img src={getTopTrackImage(track)!} alt={track.name} className="w-12 h-12 object-cover mr-2"/>
                                    ) : (
                                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center mr-2">
                                            <Music className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate"><strong>{track.artist["#text"] || track.artist.name}</strong> - {track.name}</p>
                                        {track.playcount && <p className="text-sm text-gray-500">Playcount {track.playcount}x</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No top tracks found.</p>
                )
            }
        </div>
    );
}