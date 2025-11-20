'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from 'react';


type RadioAudioContextType = {
    isPlaying: boolean;
    // currentMixName: string;
    // currentShowName: string | null;
    // currentdjName: string | null;
    // audioUrl : string | null;
    // audioRef: React.RefObject<HTMLAudioElement | null>;
    // duration: number;
    // currentTime: number;
    // imageUrl: string;
    // location: string;
    // airDate: string | null;
    // playTrack: (trackURL: string, mixName: string, showName: string, djName: string, imageUrl:string, location: string, airDate:string) => void;
    // togglePlayPause: () => void;
    // setCurrentTime: (time: number) => void;
    // setDuration: (duration: number) => void;
}

export const AudioContext = createContext<RadioAudioContextType>({isPlaying: false});
// export const RadioAudioContext = createContext<RadioAudioContextType | undefined>({isPlaying:false})