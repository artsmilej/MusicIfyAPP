export interface Track {
  id: number;
  title: string;
  artist: {
    name: string;
    picture_small: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  duration: number;
  preview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface DeezerError {
  type: string;
  message: string;
  code: number;
}