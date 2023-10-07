import React from "react";
import classes from "./tracksCard.module.css"
import BtnPlay from "../../ui/button/BtnPlay"
import BtnAdd from "../../ui/button/BtnAdd"
import "../../App.css"

const TracksCard = ({track, playTrack, showBtnAdd}) => {
    const handlePlayClick = () => {
        playTrack(track)
    } 
   
    return (
        <div className={`${classes.cardStyle} bgElement`}>
            <div>
                <div>
                    {track && track.id3 ? (track.id3?.title ? track.id3.title : "-----") : "-----"} / 
                    {track && track.id3 ? (track.id3?.artist ? track.id3.artist : "-----") : "-----"}
                </div>
                <div>Альбо: {track && track.id3 ? (track.id3?.album ? track.id3.album : "-----") : "-----"}</div>
            </div>
            <div style={{display: "flex"}}>
                <BtnPlay onClick={handlePlayClick}></BtnPlay>
                {showBtnAdd && <BtnAdd></BtnAdd>}
                
            </div>
        </div>
    )
}

export default TracksCard