import React from "react";
import classes from "./tracksCard.module.css"
import BtnPlay from "../../ui/button/BtnPlay"
import BtnAdd from "../../ui/button/BtnAdd"
import "../../App.css"
import { actionSetPlaylist } from "../../storeCreate/playerThunk";
import { useDispatch, useSelector } from 'react-redux';

const TracksCard = ({track, playTrack, playlist, showBtn, addTrackInPlaylist, clickDelete}) => {
    const dispatch = useDispatch()
    const activeTrack = useSelector((state) => state.player.track)
    const playClick = () => {
        playTrack(track)
        if (playlist) {
            dispatch(actionSetPlaylist(playlist))
        } else {
            dispatch(actionSetPlaylist(null))
        }
    } 
   
    return (
        <div onClick={clickDelete} className={`${classes.cardStyle} bgElement ${activeTrack === track ? classes.activeTrackBg : ""}`}>
            <div>
                <div>
                    {track && track.id3 ? (track.id3?.title ? track.id3.title : "-----") : "-----"} / {track && track.id3 ? (track.id3?.artist ? track.id3.artist : "-----") : "-----"}
                </div>
                <div>Альбо: {track && track.id3 ? (track.id3?.album ? track.id3.album : "-----") : "-----"}</div>
            </div>
            <div style={{display: "flex"}}>
                <BtnPlay onClick={playClick}></BtnPlay>
                { showBtn ? 
                    <BtnAdd onClick={() => addTrackInPlaylist(track)}></BtnAdd> :
                    null
                }
                
            </div>
        </div>
    )
}

export default TracksCard