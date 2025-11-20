'use client'

import test from 'node:test';
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
    currentMixName: string;
    currentShowName: string | null;
    currentdjName: string | null;
    audioUrl : string | null;
    audioHTML: React.RefObject<HTMLAudioElement| null>;
    duration: number;
    currentTime: number;
    imageUrl: string;
    location: string;
    airDate: string | null;
    playTrack: (trackURL: string, mixName: string, showName: string, djName: string, imageUrl:string, location: string, airDate:string) => void;
    togglePlayPause: () => void;
    // setCurrentTime: (time: number) => void;
    // setDuration: (duration: number) => void;
}

export const RadioAudioContext = createContext<RadioAudioContextType | undefined>(undefined);
// export const RadioAudioContext = createContext<RadioAudioContextType | undefined>({isPlaying:false})


export function RadioAudioContextProvider ({testInt, children}: {testInt: number, children: ReactNode}){
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMixName, setcurrentMixName] = useState('');
  const [currentShowName, setcurrentShowName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [airDate, setCurrentAirDate] = useState('');
  const [currentdjName, setcurrentdjName] = useState('');  
  const [audioUrl, setAudioUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioHTML = useRef<HTMLAudioElement| null>(null);
  console.log("MY TEST INT")
      console.log(testInt)
    

  const playTrack = (trackURL: string, mixName: string, showName: string, djName: string, imageUrl: string, location: string, airDate: string) => {
    setAudioUrl(trackURL);
      setIsPlaying(true);
      setcurrentMixName(mixName);
      setcurrentShowName(showName);
      setcurrentdjName(djName);
      setCurrentTime(0);
      setImageUrl(imageUrl);
      setCurrentAirDate(airDate);
      setLocation(location)
      if (audioHTML.current) {
        console.log("setting up a new mix or track called: " + mixName);
        console.log(trackURL, mixName, showName, djName);
        audioHTML.current.src = trackURL;
        audioHTML.current.play();
        audioHTML.current.onended = () => {
          console.log(mixName + " has ended")
        };
      }
    };

    const togglePlayPause = () => {
        if (audioHTML.current){
            if (isPlaying) {
                audioHTML.current.pause();
            }
            else {
                audioHTML.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
    <RadioAudioContext.Provider value={{
    isPlaying,
    currentMixName,
    currentShowName, 
    currentdjName, 
    audioUrl, 
    audioHTML,
    duration,
    currentTime, 
    imageUrl, 
    location,
    airDate,
    playTrack,
    togglePlayPause}}>
        {children}
        </RadioAudioContext.Provider>)
  }

  // wrapper function to ensure that context is initialized correctly
  export function useRadioAudioContext(){
    try{
    const context = useContext(RadioAudioContext);
    if (context === undefined) {
        throw new Error('Trying to get RadioAudioContext outside of provider. Context not found')
    }
    return context;
    }
    catch(Error){
        console.log(Error)
    }

  }