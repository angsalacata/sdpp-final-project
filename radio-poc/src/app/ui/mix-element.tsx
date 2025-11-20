'use client'

import { useRadioAudioContext } from "../contexts/AudioContext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause"


export function MixElement(props:any){
    const {isPlaying, audioUrl, playTrack, togglePlayPause} = useRadioAudioContext();

    let isCurrentTrack = props.mixKey === audioUrl;

    const handleClick = (mixKey: string) =>{

        if (isCurrentTrack) {
            console.log("CLICKED ON THE SAME TRACK");
            togglePlayPause();
        }
        else{
            console.log("CLICKED ON A DIFFERENT TRACK");
            playTrack(mixKey, "TEST MIX", "THE TEST SHOW", "DJ TEST", "---", "TEST CITY", "TEST DATE")
        }

    }

    return(
        <div>
            <button onClick={() => handleClick(props.mixKey)}> 
                {isPlaying && isCurrentTrack ? <PauseIcon/> : <PlayArrowIcon/>}
            </button>
        </div>
    );

}