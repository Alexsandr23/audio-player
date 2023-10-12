import React from "react";
import TracksCard from "../../components/tracks/TracksCard";
import { useGetTracksQuery} from "../../storeCreate/api";
import Spiner from "../../ui/Spiner"
import { useDispatch} from 'react-redux';
import {addAndPlayTrack} from "../../storeCreate/playerThunk"
import MyButton from "../../ui/button/MyButton";
import { history } from "../../App";

const ControlladTrecks = () => {
    const {isLoading, data } = useGetTracksQuery()
    const dispatch = useDispatch()
    
    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }
    const goMyTrack = () => history.push(`/my-tracks/`)
      return isLoading  ? 
        <div style={{width: "inherit", height: "inherit", display: "flex", justifyContent: "center"}}>
            <Spiner/>
        </div> : 
            <div>
                <h2>Треки</h2>
                <MyButton onClick={goMyTrack}>Мої треки</MyButton>
                {data && data.TrackFind.map(track => (
                    track.url && track.id3.title ? (
                    <TracksCard key={track._id} track={track} playTrack={playTrack}/>) : 
                    (null)))}
            </div>
     
}

export default ControlladTrecks