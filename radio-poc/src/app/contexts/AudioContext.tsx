'use client'
import {io, Socket} from 'socket.io-client';
import SocketIo from 'socket.io-client';
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
    // socket for live stream
    socket: Socket | null;
    // live stream meta data info
    liveStreamStatus: string;
    liveStreamShowName: string;
    setUpdatedStreamInfo: (liveStreamStatus: string, liveStreamShowName: string) => void;
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
  const [liveStreamStatus, setLiveStreamStatus] = useState('');
  const [liveStreamShowName, setLiveStreamShowName] = useState('');

  const audioHTML = useRef<HTMLAudioElement| null>(null);
  console.log("MY TEST INT")
  console.log(testInt)


  const setUpdatedStreamInfo = (liveStreamStatusIn: string, liveStreamShowNameIn: string) => {
    console.log("UPDATING THE STREAM STATUS AND SHOWNAME!")
    setLiveStreamStatus(liveStreamStatusIn)
    setLiveStreamShowName(liveStreamShowNameIn)
  }
    
  const socket = SocketIo('https://api.radiocult.fm', {

        auth: {
            'x-api-key': 'pk_0702c923a16b4a24814a6c4a668001c8',
                },
        transports: ['websocket'],
        query: {
            stationId: 'redux-731b6892',
        },
    })
  
  useEffect(() => {
        
        console.log("IN USE EFFECT IN CONTEXT ")

        socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('player-metadata', ({status, content, metadata }) => {
        console.log("did i get meta data")
        console.log(status)
        console.log("content")
        console.log(content)
        console.log("meta data")
        console.log(metadata)

        if (status == "schedule") {
            const scheduleEventName = content["title"]
            setUpdatedStreamInfo(status, scheduleEventName)
        }
        else {
            setUpdatedStreamInfo(status, '')
        }
    });

    return () => {
        console.log("disconnecting?")
        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
		socket.off("player-metadata");
	};
    }, [socket, liveStreamStatus, liveStreamShowName])
  
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
    togglePlayPause,
    socket,
    liveStreamStatus,
    liveStreamShowName,
    setUpdatedStreamInfo
    }}>
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