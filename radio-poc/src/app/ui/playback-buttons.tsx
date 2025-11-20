'use client'
import { useRadioAudioContext } from "../contexts/AudioContext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause"

export function PlaybackButtons() {
    const {isPlaying, currentMixName, togglePlayPause} = useRadioAudioContext();

    return(<button
      className="mix-play-button"
      onClick={togglePlayPause}
      disabled={!currentMixName}
    >
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </button>);
}