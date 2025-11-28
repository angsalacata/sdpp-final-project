'use client'

import { useRadioAudioContext } from "../contexts/AudioContext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause"
import { fetchInitialGetLiveStream } from "../lib/radio-actions";
import io from 'socket.io-client';
import SocketIo from 'socket.io-client';

export function LiveStreamElement(props:any){
    const {isPlaying, audioUrl, playTrack, togglePlayPause, liveStreamStatus, liveStreamShowName, setUpdatedStreamInfo} = useRadioAudioContext();
    // const [status, setStatus] = useState('');

    // if status = offAir, blank. if status = schedule it is the title of what is the schedule block
    // const [currentlyStreamingName, setCurrentlyStreamingName] = useState('');

    const isPlayingLiveStream = props.mixKey === audioUrl;

    const initialLiveStreamData = fetchInitialGetLiveStream();

    console.log("got initial live stream data")
    console.log(initialLiveStreamData)
    
    const initialLiveStreamStatus = initialLiveStreamData['result']['status']
    const initialLiveStreamName = initialLiveStreamStatus == 'scheduled'? initialLiveStreamStatus['result']['title'] : ''

    setUpdatedStreamInfo(initialLiveStreamName, initialLiveStreamName)

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
        {(liveStreamStatus == 'schedule') ? (<div> 
            <a>Currently Listening to: {liveStreamShowName}</a>
            <button onClick={() => handleClick(props.mixKey)}> 
                {isPlaying && isPlayingLiveStream ? <PauseIcon/> : <PlayArrowIcon/>}
            </button>
        </div>) :
         <div>Off Air- Please listen to pre-recorded music in the archive page.</div>}
        </div>
    );

}