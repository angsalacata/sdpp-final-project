'use client'


import { useContext } from "react"
import { RadioAudioContext, useRadioAudioContext } from "../contexts/AudioContext"
import { PlaybackButtons } from "../ui/playback-buttons"
import "@/app/styles/persistent-player.scss"

export function PersistentPlayer(){

    const {audioHTML, setCurrentTime, setDuration, currentMixName, imageUrl} = useRadioAudioContext();

    return(
        <div className="persistent-player">
            <audio ref={audioHTML}/>
            <PlaybackButtons></PlaybackButtons>
            
        </div>
    );

}