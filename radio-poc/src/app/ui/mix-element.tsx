'use client'

import { useRadioAudioContext } from "../contexts/AudioContext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause"
import "../styles/mix-row.scss";
import React from "react";


export function MixElement(props:any){
    const {isPlaying, audioUrl, playTrack, togglePlayPause} = useRadioAudioContext();

    const isCurrentTrack = props.mixKey === audioUrl;

    const handleClick = (mixName: string, showName: string, dj: string, // todo- dj is not correct should be hostName
            mixKey: string, imageKey: string, location: string, airDate: string) => {
        if (isCurrentTrack) {
            console.log("CLICKED ON THE SAME TRACK");
            togglePlayPause();
        }
        else{
            console.log("CLICKED ON A DIFFERENT TRACK");
            playTrack(mixKey, mixName, showName, dj, imageKey, location, airDate)
        }

    }

    return(
        <div className="mix-row">
            <div className="mix-header">
            <button  
                className="mix-play-button"
                id="playpause"
                onClick={() => handleClick(props.mixName,
              props.showName,
              props.guest ? props.guest : props.hostName,
              props.mixKey,
              props.image,
              props.location,
              props.airdate)}> 
                {isPlaying && isCurrentTrack ? <PauseIcon/> : <PlayArrowIcon/>}
            </button>

            <React.Fragment>
      <div className="show-info-row">
        <div className="showname">
          <div className="show">
            <a className="show">
              {props.showName}
            </a>
          </div>
          <div className="host">{props.guest ?  (props.hostName && <>{props.guest}</>) : (props.hostName && <>{props.hostName}</>)}</div>
        </div>
        <div className="location">{props.location}</div>
      </div>
    </React.Fragment>
            </div>
        </div>
    );

}