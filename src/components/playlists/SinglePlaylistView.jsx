import React, { useState } from "react";
import MyButton from "../../ui/button/MyButton";
import TracksCard from "../tracks/TracksCard";
import BossComponentPlaylist from "../../module/playlists/BossComponentPlaylist";


const SinglePlaylistView = ({playlist}) => {
   
    const [showBoss, setShowBoss] = useState(true)

    return ( showBoss ? 
        <div>
            <MyButton>Додати в плеєр</MyButton>
            <MyButton onClick={() => setShowBoss(false)}>Редагувати плейліст</MyButton>
            <h3>{playlist.name}</h3>
            <p>Опис: {playlist.description ? playlist.description : "-----"}</p>
            <div>
                {playlist.tracks.map(track => track.id3 ? 
                <TracksCard key={track._id} track={track}></TracksCard> : 
                null)}
            </div>

            <p></p>
        </div> :
        <BossComponentPlaylist initialPlaylist={playlist}></BossComponentPlaylist>

    )
}

export default SinglePlaylistView