import React from "react";
import TracksCard from "../components/tracks/TracksCard";
import { useGetTracksMyQuery} from "../storeCreate/api";
import Spiner from "../ui/Spiner"
import { useDispatch, useSelector } from 'react-redux';
import {addAndPlayTrack} from "../storeCreate/playerThunk"
import "../App.css"


const PageMyTracks = () => {
    const dispatch = useDispatch()
    const idUser = useSelector(store => store.auth.payload.sub.id)
    const {isLoading, data } = useGetTracksMyQuery({idUser: idUser})
    

    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }
    

      return (<div className="stylePage">
        {
            isLoading  ? 
            <div style={{width: "inherit", height: "inherit", display: "flex", justifyContent: "center"}}>
                <Spiner/>
            </div> : 
                <div>
                    <h3>Мої треки</h3>
                    {data && data.TrackFind.map(track => (
                        track.url && track.id3.title ? (
                        <TracksCard key={track._id} track={track} playTrack={playTrack}/>) : 
                        (null)))}
                </div>
            }
      </div>)
      

     
}

export default PageMyTracks