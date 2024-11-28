export interface SoundData {
  id: string | null;
  authorId: string;
  title: string;
  genre: string;
  audioUrl: string;
  audioHash: string;
  imageUrl?: string | null;
  imageHash?: string | null;
  lifetimeLikes: number;
  country?: string | null;
  timestamp?: Date;
}

