/*
{
    "recenttracks": {
        "track": [{
            "artist": {
                "mbid": "074e3847-f67f-49f9-81f1-8c8cea147e8e",
                "#text": "Bring Me the Horizon"
            },
            "streamable": "0",
            "image": [{
                "size": "small",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/34s\/e7a508490c30452c4524f74984279698.png"
            }, {
                "size": "medium",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/64s\/e7a508490c30452c4524f74984279698.png"
            }, {
                "size": "large",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/174s\/e7a508490c30452c4524f74984279698.png"
            }, {
                "size": "extralarge",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/300x300\/e7a508490c30452c4524f74984279698.png"
            }],
            "mbid": "20719a65-e988-4190-abb5-300c70ddfa51",
            "album": {
                "mbid": "3e8f35ea-5621-4929-af02-1a1415d8a94a",
                "#text": "That's the Spirit"
            },
            "name": "Drown (New)",
            "url": "https:\/\/www.last.fm\/music\/Bring+Me+the+Horizon\/_\/Drown+(New)",
            "date": {
                "uts": "1765033404",
                "#text": "06 Dec 2025, 15:03"
            }
        }, , {
            "streamable": {
                "fulltrack": "0",
                "#text": "0"
            },
            "mbid": "90a93bad-3249-4fe4-b0c8-9729745e86de",
            "name": "Matilda",
            "image": [{
                "size": "small",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/34s\/2a96cbd8b46e442fc41c2b86b821562f.png"
            }, {
                "size": "medium",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/64s\/2a96cbd8b46e442fc41c2b86b821562f.png"
            }, {
                "size": "large",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/174s\/2a96cbd8b46e442fc41c2b86b821562f.png"
            }, {
                "size": "extralarge",
                "#text": "https:\/\/lastfm.freetls.fastly.net\/i\/u\/300x300\/2a96cbd8b46e442fc41c2b86b821562f.png"
            }],
            "artist": {
                "url": "https:\/\/www.last.fm\/music\/Harry+Styles",
                "name": "Harry Styles",
                "mbid": "7eb1ce54-a355-41f9-8d68-e018b096d427"
            },
            "url": "https:\/\/www.last.fm\/music\/Harry+Styles\/_\/Matilda",
            "duration": "245",
            "@attr": {
                "rank": "2"
            },
            "playcount": "28"
        },
}
 */

export interface TrackInfo {
    album?: {
        image: {
            size: string;
            "#text": string;
        }[];
    };
}

export interface LastFmTrack {
    artist : {
        mbid: string;
        "#text"?: string;
        name?: string;
        url?: string;
    },
    streamable : string;
    image : {
        size: string;
        "#text": string;
    }[];
    mbid : string;
    album : {
        mbid: string;
        "#text": string;
    };
    name : string;
    url : string;
    date? : {
        uts: string;
        "#text": string;
    }
    duration? : string;
    playcount? : string;
}
/*

Replaced by server API routes with caching

export async function GetRecentLastFmTracks() : Promise<LastFmTrack[]> {
    const api = API_KEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${api}&format=json&limit=10`;
    const data = await fetch(url, { next: { revalidate: 3600 } });
    const json = await data.json();
    return json.recenttracks.track;
}

export async function GetTopLastFmTracks(period : string) : Promise<LastFmTrack[]> {
    const api = API_KEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LAST_FM_USERNAME}&api_key=${api}&format=json&limit=10&period=${period}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const json = await response.json();
    return json.toptracks.track;
}

export async function GetTrackInfo(artist: string, track: string): Promise<{ album?: { image: { size: string; "#text": string }[] } }> {
    const api = API_KEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const json = await response.json();
    return json.track;
}
 */