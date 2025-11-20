'use client'

import { useRadioAudioContext } from "../contexts/AudioContext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause"


export function LiveStreamElement(props:any){
    const {isPlaying, audioUrl, playTrack, togglePlayPause} = useRadioAudioContext();

    let isPlayingLiveStream = props.mixKey === audioUrl;

    const handleClick = (mixKey: string) =>{

        if (isPlayingLiveStream) {
            console.log("CLICKED ON LIVESTREAM AGAIN");
            togglePlayPause();
        }
        else{
            console.log("CLICKED ON A NOT LIVE STREAM");
            playTrack(mixKey, "LIVE STREAM TEST", "THE LIVE SHOW", "DJ LIVE", "---", "LIVE CITY", "LIVE DATE")
        }

    }

    return(
        <div>
            <a>LIVE STREAM</a>
            <button onClick={() => handleClick(props.mixKey)}> 
                {isPlaying && isPlayingLiveStream ? <PauseIcon/> : <PlayArrowIcon/>}
            </button>
        </div>
    );

}