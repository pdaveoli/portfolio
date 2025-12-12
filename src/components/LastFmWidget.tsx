"use client";
import { useEffect, useState, useRef } from "react";
import { LastFmTrack, TrackInfo } from "@/lib/lastfm";
import { Music } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface CacheData {
    [key: string]: LastFmTrack[];
}

export default function LastFmWidget() {
    const [recentTracks, setRecentTracks] = useState<LastFmTrack[]>([]);
    const [topTracks, setTopTracks] = useState<LastFmTrack[]>([]);
    const [topTrackImages, setTopTrackImages] = useState<Record<string, string | null>>({});
    const [period, setPeriod] = useState<string>("7day");
    const [recentTracksLoading, setRecentTracksLoading] = useState<boolean>(true);
    const [topTracksLoading, setTopTracksLoading] = useState<boolean>(true);
    const cache = useRef<CacheData>({});

    useEffect(() => {
        async function getTopTracks(selectedPeriod: string) {
            setTopTracksLoading(true);
            try {
                const cacheKey = `top-tracks-${selectedPeriod}`;
                if (cache.current[cacheKey]) {
                    const cachedTracks = cache.current[cacheKey];
                    setTopTracks(cachedTracks);
                    await hydrateTopTrackImages(cachedTracks);
                    setTopTracksLoading(false);
                    return;
                }

                const res = await fetch(`/api/last-fm/top-tracks?period=${selectedPeriod}`);
                const data = (await res.json()) as { toptracks: { track: LastFmTrack[] } };
                const fetchedTracks = data.toptracks.track;
                // Make sure to only show 10 tracks
                const limitedTracks = fetchedTracks.slice(0, 10);
                cache.current[cacheKey] = limitedTracks;
                await hydrateTopTrackImages(limitedTracks);
                setTopTracks(limitedTracks);
            } catch (error) {
                console.error("Error fetching top tracks:", error);
                setTopTracks([]);
            } finally {
                setTopTracksLoading(false);
            }
        }

        async function hydrateTopTrackImages(tracks: LastFmTrack[]) {
            const images: Record<string, string | null> = {};
            await Promise.all(
                tracks.map(async (track) => {
                    const artistName = track.artist.name || track.artist["#text"] || "";
                    const res = await fetch(
                        `/api/last-fm/get-track-info?artist=${encodeURIComponent(
                            artistName,
                        )}&track=${encodeURIComponent(track.name)}`,
                    );
                    const info: TrackInfo = await res.json();
                    const img = info.album?.image?.find(
                        (i) => i.size === "large" || i.size === "extralarge",
                    );
                    images[`${artistName}-${track.name}`] = img?.["#text"] || null;
                }),
            );
            setTopTrackImages(images);
        }

        async function getRecentTracks() {
            setRecentTracksLoading(true);
            try {
                const cacheKey = "recent-tracks";
                if (cache.current[cacheKey]) {
                    setRecentTracks(cache.current[cacheKey]);
                    return;
                }

                const res = await fetch("/api/last-fm/recently-played");
                const data = (await res.json()) as { recenttracks: { track: LastFmTrack[] } };
                const fetchedTracks = data.recenttracks.track;
                const limitedTracks = fetchedTracks.slice(0, 10);
                cache.current[cacheKey] = limitedTracks;
                setRecentTracks(limitedTracks);
            } catch (error) {
                console.error("Error fetching recent tracks:", error);
                setRecentTracks([]);
            } finally {
                setRecentTracksLoading(false);
            }
        }

        getTopTracks(period);
        getRecentTracks();
    }, [period]);

    function getTrackImage(track: LastFmTrack): string | null {
        const image = track.image?.find(
            (img) => img.size === "large" || img.size === "extralarge",
        );
        const url = image?.["#text"];
        if (!url || url.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
            return null;
        }
        return url;
    }

    function getTopTrackImage(track: LastFmTrack): string | null {
        const artistName = track.artist.name || track.artist["#text"] || "";
        const url = topTrackImages[`${artistName}-${track.name}`];
        if (!url || url.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
            return null;
        }
        return url;
    }

    const renderSkeletonRows = (rows: number) => (
        <div className="flex flex-col gap-2 md:mr-8">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className="p-2 border rounded flex flex-row animate-pulse"
                >
                    <Skeleton className="w-12 h-12 mr-2 rounded" />
                    <div className="min-w-0 flex-1">
                        <Skeleton className="h-4 mb-2 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:max-w-5xl">
            <div className="flex flex-col w-full items-center justify-center mb-8 space-y-4 text-center">
                <h1 className="text-4xl font-bold">My Music Taste</h1>
                <p className="max-w-2xl text-md font-light text-gray-800 dark:text-gray-400">This section is made as a demonstration of API requests, but also shows the music I listen to most recently. Data is cached so may be slightly outdated. All data is sourced from the Last.Fm API meaning some album covers may not load.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
                <div>
                    <div className="h-10 flex items-center justify-between mb-2 md:mr-10">
                        <h2>Recent Tracks:</h2>
                    </div>
                    {recentTracksLoading
                        ? renderSkeletonRows(10)
                        : recentTracks.length > 0
                            ? (
                                <div className="flex flex-col gap-2 md:mr-8">
                                    {recentTracks.map((track, index) => (
                                        <div key={`recent-${index}`} className="p-2 border rounded flex flex-row">
                                            {getTrackImage(track)
                                                ? (
                                                    <img
                                                        src={getTrackImage(track)!}
                                                        alt={track.name}
                                                        className="w-12 h-12 object-cover mr-2 rounded"
                                                    />
                                                )
                                                : (
                                                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center mr-2">
                                                        <Music className="w-6 h-6 text-muted-foreground" />
                                                    </div>
                                                )}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate">
                                                    <strong>{track.artist["#text"]}</strong> - {track.name}
                                                </p>
                                                {track.date ? (
                                                    <p className="text-sm text-gray-500 truncate">
                                                        Played at: {track.date["#text"]}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-green-500">Now Playing</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            : <p>No recent tracks found.</p>}
                </div>

                <div>
                    <div className="flex items-center justify-between h-10 mb-2 md:mr-10">
                        <h2>Top Tracks:</h2>
                        <Select onValueChange={setPeriod} value={period}>
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
                    {topTracksLoading
                        ? renderSkeletonRows(10)
                        : topTracks.length > 0
                            ? (
                                <div className="flex flex-col gap-2 md:mr-8">
                                    {topTracks.map((track, index) => (
                                        <div key={`top-${index}`} className="p-2 border rounded flex flex-row">
                                            {getTopTrackImage(track)
                                                ? (
                                                    <img
                                                        src={getTopTrackImage(track)!}
                                                        alt={track.name}
                                                        className="w-12 h-12 object-cover mr-2"
                                                    />
                                                )
                                                : (
                                                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center mr-2">
                                                        <Music className="w-6 h-6 text-muted-foreground" />
                                                    </div>
                                                )}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate">
                                                    <strong>{track.artist["#text"] || track.artist.name}</strong> - {track.name}
                                                </p>
                                                {track.playcount && (
                                                    <p className="text-sm text-gray-500">
                                                        Playcount {track.playcount}x
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            : <p>No top tracks found.</p>}
                </div>
            </div>
        </div>
    );
}
