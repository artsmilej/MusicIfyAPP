import axios from 'axios';
import { Track } from '../types/music';

interface DeezerResponse<T> {
  data: T[];
}

const api = axios.create({
  baseURL: 'https://deezerdevs-deezer.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '0b1cbf678amsh7ee5cab10cbccf4p142228jsn295aea796d99',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
  }
});

export const searchTracks = async (query: string): Promise<Track[]> => {
  try {
    const response = await api.get<DeezerResponse<Track>>(`/search?q=${query}`);
    return response.data.data || [];
  } catch (error) {
    console.error('Search tracks error:', error);
    return [];
  }
};