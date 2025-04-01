'use client'

interface SpotifyPlayerProps {
    playlistId: string;
    width?: number;
    height?: number;
}

export function SpotifyPlayer({ playlistId, width = 300, height = 380 }: SpotifyPlayerProps) {
    return (
        <div className="w-full flex justify-center">
            <iframe
                src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
                width={width}
                height={height}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
            />
        </div>
    );
} 