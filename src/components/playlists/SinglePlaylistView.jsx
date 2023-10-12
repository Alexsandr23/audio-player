import React, { useState } from "react"
import MyButton from "../../ui/button/MyButton"
import TracksCard from "../tracks/TracksCard"
import BossComponentPlaylist from "../../module/playlists/BossComponentPlaylist"
import { useDispatch } from 'react-redux';
import { addAndPlayTrack } from "../../storeCreate/playerThunk";


const SinglePlaylistView = ({playlist}) => {
    const [showBoss, setShowBoss] = useState(true)
    const dispatch = useDispatch()
    const playTrack = (track) => {
        dispatch(addAndPlayTrack(track))
    }
    
    console.log(playlist)
    return ( showBoss ? 
        <div>
            
            <h3>{playlist.name}</h3>
            <p>Опис: {playlist.description ? playlist.description : "-----"}</p>
            <MyButton onClick={() => setShowBoss(false)}>Редагувати плейліст</MyButton>
            <div>
                {playlist.tracks && playlist.tracks.map(track => track.id3 ? 
                <TracksCard key={track._id} track={track} playTrack={playTrack} playlist={playlist}></TracksCard> : 
                null)}
            </div>

            <p></p>
        </div> :
        <BossComponentPlaylist initialPlaylist={playlist}></BossComponentPlaylist>

    )
}

export default SinglePlaylistView