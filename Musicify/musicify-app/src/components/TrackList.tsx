import { Play, Pause } from 'lucide-react';
import { Track } from '../types/music';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
}

export default function TrackList({ tracks, currentTrack, isPlaying, onTrackSelect }: TrackListProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className={`flex items-center p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${
            currentTrack?.id === track.id ? 'bg-gray-800' : ''
          }`}
          onClick={() => onTrackSelect(track)}
        >
          <div className="flex-shrink-0 w-12 h-12 relative group">
            <img
              src={track.album.cover_medium}
              alt={track.album.title}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded">
              {currentTrack?.id === track.id && isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </div>
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-white font-medium">{track.title}</h3>
            <p className="text-gray-400 text-sm">{track.artist.name}</p>
          </div>
          <div className="text-gray-400 text-sm">{formatDuration(track.duration)}</div>
        </div>
      ))}
    </div>
  );
}