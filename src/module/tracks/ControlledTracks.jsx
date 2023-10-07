import React from "react";
import TracksCard from "../../components/tracks/TracksCard";
import { useGetTracksQuery } from "../../storeCreate/api";
import Spiner from "../../ui/Spiner"
import { useDispatch } from 'react-redux';
import {addAndPlayTrack} from "../../storeCreate/playerThunk"

const ControlladTrecks = () => {
    const {isLoading, data } = useGetTracksQuery()
    const dispatch = useDispatch()
    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }
  

      return isLoading ? 
        (<div style={{width: "inherit", height: "inherit", display: "flex", justifyContent: "center"}}>
            <Spiner/>
        </div>) : 
        (<div>
            <h3>Треки</h3>
            {data.TrackFind.map(track => (
                track.url && track.id3.title ? (
                <TracksCard key={track._id} track={track} playTrack={playTrack} showBtnAdd={true}/>) : 
                (null)))}
        </div>)

}

export default ControlladTrecks