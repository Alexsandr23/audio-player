import React, { useEffect, useState}  from "react";
import classes from "./Player.module.css"
import "../../App.css"
import BtnPlay from "../../ui/button/BtnPlay";
import BtnPrev from "../../ui/button/BtnPrev";
import BtnNext from "../../ui/button/BtnNext";
import BtnPause from "../../ui/button/BtnPause";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import TracksCard from "../../components/tracks/TracksCard"
import "../../App.css"

const PlayerView = ({ 
                    playerState, 
                    playTrack, 
                    pauseTrack, 
                    stopTrack, 
                    nextTrackHandler,
                    prevTrackHandler, 
                    setVolumeHandler, 
                    trackTimeChange,
                    playTrackPlaylist}) => {
    
    const [currentTime, setCurrentTime] = useState(playerState.currentTime)
    const [duration, setDuration] = useState(playerState.duration)
    const [volume, setVolume] = useState(playerState.volume)
    const [, setIsPlaying] = useState(playerState.isPlaying)
    const [, setIsStopped] = useState(playerState.isStopped)
    const [track, setTrack] = useState(playerState.track)
    const [playlist, setPlaylist] = useState(playerState.playlist)
    
  
    useEffect(() => {
        setCurrentTime(playerState.currentTime)
        setDuration(playerState.duration)
        setVolume(playerState.volume)
        setIsPlaying(playerState.isPlaying)
        setIsStopped(playerState.isStopped)
        setTrack(playerState.track)
        setPlaylist(playerState.playlist)
    }, [playerState])


    return (
        <>
        <div className={`${classes.container}`}>
            <canvas
                      
                        className={`${classes.wrapper} ${classes.canvas} bgElement`}
                        width={400} 
                        height={200} 
            ></canvas>
            <div className={`${classes.wrapper} ${classes.playlist} bgElement scrolStyle`}>
                {playlist ? 
                    playlist.tracks.map( track => (
                        <TracksCard key ={track._id} track={track} playTrack={playTrackPlaylist} playlist={playlist}></TracksCard>
                    )) : track ? 
                    <TracksCard track={track} playTrack={playTrackPlaylist} ></TracksCard> : null
                }
            </div>
        </div>         
            <div className={`${classes.wrapper} ${classes.player} bgElement`}>
                <div>
                    <Slider 
                        size="small" 
                        value={currentTime} 
                        max={duration}
                        aria-label="Small" 
                        valueLabelDisplay="off" 
                        style={{color: "#fff"}}
                        onChange={trackTimeChange}
                        onChangeCommitted={() => playTrack()}

                        />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px"}}>
                    <div className={classes.containerBtn}>
                            <BtnPrev onClick={prevTrackHandler}></BtnPrev>
                            <BtnPlay onClick={playTrack}></BtnPlay>
                            <BtnPause onClick={pauseTrack}></BtnPause>
                            <BtnNext onClick={nextTrackHandler}></BtnNext>
                        <div style={{padding: "0 5px"}}>
                        {`${Math.floor(currentTime / 60) < 10 ? "0" : ""}${Math.floor(currentTime / 60)} : ${Math.round(currentTime % 60) < 10 ? "0" : ""}${Math.round(currentTime % 60)}`} / {`${Math.floor(duration / 60) < 10 ? "0" : ""}${Math.floor(duration / 60)} : ${Math.round(duration % 60) < 10 ? "0" : ""}${Math.round(duration % 60)}`}
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center", padding: "0 5px"}}>{track && track.id3 && track.id3.title}</div>
                        <div style={{textAlign: "center", padding: "0 5px"}}>{track && track.id3 && track.id3.artist}</div>
                    </div>

                    <Box sx={{ width: 200 }}>
                        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDown />
                        <Slider aria-label="Volume" value={volume * 100} onChange={(event, newValue) => setVolumeHandler(newValue)} style={{color: "#fff"}}/>
                        <VolumeUp />
                        </Stack>
                    </Box>
                </div>

            </div>
        </>

    )
}

export default PlayerView