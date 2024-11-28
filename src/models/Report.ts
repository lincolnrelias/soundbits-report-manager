import { SoundData } from "./SoundData";

export interface Report {
    id: string;
    userId: string;
    soundData?: SoundData | null;
    reason: string;
    timestamp?: Date;
    status: string;
    comment?: string;
  }