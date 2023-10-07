import React from "react";
import PlayerView from "../../components/player/PlayerView";
import { useSelector, useDispatch } from "react-redux"
import {
    play,
    pause,
    stop,
    setTrack,
    setDuration,
    nextTrack,
    prevTrack,
    setPlayList,
    setCurrentTime,
    setVolume,
  } from "../../storeCreate/playerSlice"
import {audio} from "../../storeCreate/playerSlice"
import { actionPlayAudio } from "../../storeCreate/playerThunk";



const ControlledPlayer = ({render: Render = PlayerView, ...props}) => {
    const dispatch = useDispatch()
    const playerState = useSelector((state) => state.player)

    audio.ondurationchange = () => {
      dispatch(setDuration(audio.duration))
    }

    audio.ontimeupdate = () => {
      dispatch(setCurrentTime(audio.currentTime))
    }
    const trackTimeChange = (event, newValue) => {
      
      setCurrentTime(newValue)
      audio.currentTime = newValue

    }
    
    const playTrack = () => {
        dispatch(actionPlayAudio())
        
      }
    
      const pauseTrack = () => {
        dispatch(pause())
      }
    
      const stopTrack = () => {
        dispatch(stop())
      }
    
      const nextTrackHandler = () => {
        dispatch(nextTrack())
      }
    
      const prevTrackHandler = () => {
        dispatch(prevTrack())
      }
    
      const setVolumeHandler = (value) => {
        const volumeValue = value / 100
        dispatch(setVolume(volumeValue));
      }


    return <Render {...props} 
        playerState={playerState}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        nextTrackHandler={nextTrackHandler}
        prevTrackHandler={prevTrackHandler}
        setVolumeHandler={setVolumeHandler}
        trackTimeChange={trackTimeChange}
    />
}

export default ControlledPlayer