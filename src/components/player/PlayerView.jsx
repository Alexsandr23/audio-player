import React, { useEffect, useState, useRef }  from "react";
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
import { audio} from "../../storeCreate/playerSlice";




const PlayerView = ({ 
                    playerState, 
                    playTrack, 
                    pauseTrack, 
                    stopTrack, 
                    nextTrackHandler,
                    prevTrackHandler, 
                    setVolumeHandler, 
                    trackTimeChange}) => {
    const { currentTime, duration, volume, isPlaying, isStopped, track } = playerState
   
//     const canvasRef = useRef(null)
   

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)()
//     const analyser = audioContext.createAnalyser()

//     const audioElement = audio

//     audioElement.crossOrigin = "anonymous"
//     audioElement.load()
//     audioElement.play()
//     audioElement.volume = volume

//     const source = audioContext.createMediaElementSource(audioElement)
//     source.connect(analyser)
//     analyser.connect(audioContext.destination)

//     analyser.fftSize = 256
//     const bufferLength = analyser.frequencyBinCount
//     const dataArray = new Uint8Array(bufferLength)

//     const WIDTH = canvas.width
//     const HEIGHT = canvas.height
//     const barWidth = (WIDTH / bufferLength) * 2.5
//     let x = 0

//     function renderFrame() {
//       requestAnimationFrame(renderFrame)

//       x = 0

//       analyser.getByteFrequencyData(dataArray)

//       ctx.fillStyle = "#000"
//       ctx.fillRect(0, 0, WIDTH, HEIGHT)

//       for (let i = 0; i < bufferLength; i++) {
//         const barHeight = dataArray[i]

//         const r = barHeight + (25 * (i / bufferLength))
//         const g = 250 * (i / bufferLength)
//         const b = 50

//         ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
//         ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

//         x += barWidth + 1;
//       }
//     }

//     renderFrame()

//     return () => {
//       audioElement.pause()
//       audioContext.close()
//     };
//   }, [volume])

    return (
        <>
        <div className={`${classes.container}`}>
        <canvas
                    // ref={canvasRef}
                    className={`${classes.wrapper} ${classes.canvas} bgElement`}
                    width={400} 
                    height={200} 
        ></canvas>

            <div className={`${classes.wrapper} ${classes.playlist} bgElement`}>
                <div>
                    <div style={{ padding: "5px 5px"}}></div>
                </div>
            </div>
        </div>         
            <div className={`${classes.wrapper} ${classes.player} bgElement`}>
                <div>
                <Slider 
                    size="small" 
                    value={currentTime} 
                    max={duration}
                    aria-label="Small" 
                    valueLabelDisplay="auto" 
                    style={{color: "#fff"}}
                    onChange={trackTimeChange}
                    
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px"}}>
                    <div className={classes.containerBtn}>
                        <BtnPrev onClick={prevTrackHandler}></BtnPrev>
                        <BtnPlay onClick={playTrack}></BtnPlay>
                        <BtnPause onClick={pauseTrack}></BtnPause>
                        <BtnNext onClick={nextTrackHandler}></BtnNext>
                        <div style={{padding: "0 5px"}}>
                            {`${Math.floor(currentTime / 60)} : ${Math.round(currentTime % 60)}`} / {`${Math.floor(duration / 60)} : ${Math.round(duration % 60)}`} 
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center", padding: "0 5px"}}>{track.id3.title}</div>
                        <div style={{textAlign: "center", padding: "0 5px"}}>{track.id3.artist}</div>
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