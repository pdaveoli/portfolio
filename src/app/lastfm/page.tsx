"use client";
import {GetRecentLastFmTracks, GetTopLastFmTracks, GetTrackInfo, LastFmTrack} from "@/lib/lastfm";
import { useEffect, useState } from "react";
import {Music} from "lucide-react";

export default function LastFmTest() {
    const [recentTracks, setRecentTracks] = useState<LastFmTrack[]>([]);
    const [topTracks, setTopTracks] = useState<LastFmTrack[]>([]);
    const [topTrackImages, setTopTrackImages] = useState<Record<string, string | null>>({});


    useEffect(() => {
        async function fetchLastFmData() {
            try {
                const recent = await GetRecentLastFmTracks();
                console.log("Recent Last.fm Tracks:", recent);
                setRecentTracks(recent);

                const top = await GetTopLastFmTracks("7day");
                console.log("Top Last.fm Tracks (7 days):", top);
                setTopTracks(top);

                const images: Record<string, string | null> = {};
                await Promise.all(top.map(async (track) => {
                    const artistName = track.artist.name || track.artist["#text"] || "";
                    const info = await GetTrackInfo(artistName, track.name);
                    const img = info.album?.image?.find(i => i.size === "large" || i.size === "extralarge");
                    images[`${artistName}-${track.name}`] = img?.["#text"] || null;
                }));
                setTopTrackImages(images);
            } catch (error) {
                console.error("Error fetching Last.fm data:", error);
            }
        }

        fetchLastFmData();
    }, []);

    function getTrackImage(track: LastFmTrack): string | null {
        const image = track.image?.find(img => img.size === "large" || img.size === "extralarge");
        const url = image?.["#text"];

        // Check if it's a placeholder image
        if (!url || url.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
            return null; // Return null for placeholder images
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
        <div>
            <h1>Last.fm Data Fetch Test</h1>
            <p>Check the console for fetched data.</p>
            {
                recentTracks.length > 0 ? (
                    <div>
                        <h2>Recent Tracks:</h2>
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
                        <h2>Top Tracks (7 days):</h2>
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