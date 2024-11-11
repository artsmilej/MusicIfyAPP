import { Search, Music2 } from 'lucide-react';
import { Genre } from '../types/music';

interface SidebarProps {
  genres: Genre[];
  selectedGenre: number | null;
  onGenreSelect: (id: number) => void;
  onSearch: (query: string) => void;
}

export default function Sidebar({ genres, selectedGenre, onGenreSelect, onSearch }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <Music2 className="w-8 h-8 text-purple-500" />
        <h1 className="text-2xl font-bold text-white">Musicify</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search tracks..."
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
          Genres
        </h2>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              onSearch(genre.name);
              onGenreSelect(genre.id);
            }}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedGenre === genre.id
                ? 'bg-purple-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}