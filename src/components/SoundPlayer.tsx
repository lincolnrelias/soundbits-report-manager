import React, { useState, useRef } from "react";
import { SoundData } from "../models/SoundData";
import { Play, Pause } from "lucide-react";
import placeholder from "../assets/placeholder.png";

interface SoundPlayerProps {
  soundData: SoundData;
}

export const SoundPlayer: React.FC<SoundPlayerProps> = ({ soundData }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg relative">
      <audio
        ref={audioRef}
        src={soundData.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Image */}
      <img
        src={soundData.imageUrl || placeholder}
        alt={soundData.title}
        className="w-72 h-72 object-fill rounded-md shadow-md"
      />
    </div>
  );
};
