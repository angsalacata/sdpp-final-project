'use client'
import { useContext } from "react"
import { RadioAudioContext, useRadioAudioContext } from "../contexts/AudioContext"
import { PlaybackButtons } from "../ui/playback-buttons"
import "../styles/globals.scss"
import clsx from "clsx";
import React from "react"



export function PersistentPlayer(){

    const {audioHTML, setCurrentTime, setDuration, currentMixName, imageUrl, currentShowName, currentdjName} = useRadioAudioContext();
    const isPlaying = currentMixName !== "";

    console.log("what is playing")
    console.log(isPlaying)
    return(
        
        <div
            className={clsx("persistent-player-container", {
                isPlaying: isPlaying,
            })}
            >
            <div className="persistent-player">
                <div className="playbutton-wrap">
                <audio ref={audioHTML}/>
                <div className="playbutton-wrap">
                <PlaybackButtons></PlaybackButtons> 
                </div>
                <div className="player-mix-info">
                {currentMixName && (
                <React.Fragment>
                    <div className="show">{currentShowName}</div>
                    <div className="host">{currentdjName}</div>
                </React.Fragment> )}
                </div>
                </div>
            </div>
            
        </div>
    );

}