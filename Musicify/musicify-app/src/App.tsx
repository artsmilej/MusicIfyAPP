import { useState, useEffect } from 'react';
import { searchTracks } from './services/api';
import Sidebar from './components/Sidebar';
import TrackList from './components/TrackList';
import Player from './components/Player';
import { Track, Genre } from './types/music';

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const staticGenres: Genre[] = [
    { id: 1, name: 'Pop' },
    { id: 2, name: 'Rock' },
    { id: 3, name: 'Jazz' },
    { id: 4, name: 'Classical' },
    { id: 5, name: 'Electronic' },
    { id: 6, name: 'Hip-Hop' },
    { id: 7, name: 'Reggae' },
    { id: 8, name: 'Country' },
    { id: 9, name: 'Metal' },
    { id: 10, name: 'Blues' },
    { id: 11, name: 'Folk' },
    { id: 12, name: 'Alternative' },
    { id: 13, name: 'Disco' },
    { id: 14, name: 'Soul' },
    { id: 15, name: 'Punk' },
    { id: 16, name: 'R&B' },
    { id: 17, name: 'Gospel' },
    { id: 18, name: 'Dance' },
    { id: 19, name: 'Latin' },
    { id: 20, name: 'Funk' },
    { id: 21, name: 'Opera' }
  ];

  useEffect(() => {
    const loadDefaultTracks = async () => {
      setIsLoading(true);
      try {
        const defaultTracks = await searchTracks('top hits');
        setTracks(defaultTracks);
      } catch (error) {
        console.error('Error loading default tracks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultTracks();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      const defaultTracks = await searchTracks('top hits');
      setTracks(defaultTracks);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchTracks(query);
      setTracks(results);
    } catch (error) {
      console.error('Error searching tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackSelect = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    if (currentIndex < tracks.length - 1) {
      setCurrentTrack(tracks[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    if (currentIndex > 0) {
      setCurrentTrack(tracks[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Sidebar
        genres={staticGenres}
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
        onSearch={handleSearch}
      />
      
      <main className="ml-64 p-8 pb-32">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedGenre
                ? staticGenres.find(g => g.id === selectedGenre)?.name || 'Tracks'
                : 'Popular Tracks'}
            </h1>
            <p className="text-gray-400">
              {isLoading ? 'Loading...' : `${tracks.length} tracks`}
            </p>
          </header>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <TrackList
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
            />
          )}
        </div>
      </main>

      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default App;