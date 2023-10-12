import React from "react";
import PlayerView from "../../components/player/PlayerView";
import { useSelector, useDispatch } from "react-redux"
import {
    play,
    pause,
    stop,
    setDuration,
    nextTrack,
    prevTrack,
    setCurrentTime,
    setVolume,
  } from "../../storeCreate/playerSlice"
import {audio} from "../../storeCreate/playerSlice"
import { addAndPlayTrack} from "../../storeCreate/playerThunk";



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
        dispatch(pause())
        setCurrentTime(newValue)
        audio.currentTime = newValue
    }
    audio.onended = () => {
        dispatch(nextTrack())
        if (playerState.playlist && playerState.playlist.tracks[playerState.playlistIndex]) {
            dispatch(play())
        } else {
            dispatch(stop())
        }
    }
    const playTrack = () => {
        dispatch(play())
        
      }
    const playTrackPlaylist = (track) => {
        dispatch(addAndPlayTrack(track))
    } 
    
      const pauseTrack = () => {
        dispatch(pause())
      }
    
      const stopTrack = () => {
        dispatch(stop())
      }
    
      const nextTrackHandler = () => {
        dispatch(nextTrack())
        if (playerState.playlist && playerState.playlist.tracks[playerState.playlistIndex]) {
            dispatch(play())
        } else {
            dispatch(stop())
        }
      }
    
      const prevTrackHandler = () => {
        dispatch(prevTrack())
        if (playerState.playlist && playerState.playlist.tracks[playerState.playlistIndex]) {
            dispatch(play())
        } else {
            dispatch(stop())
        }
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
        playTrackPlaylist={playTrackPlaylist}
    />
}

export default ControlledPlayer