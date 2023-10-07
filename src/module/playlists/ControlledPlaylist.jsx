import React from "react";
import { useGetPlaylistsQuery } from "../../storeCreate/api";
import Spiner from "../../ui/Spiner";
import PlaylistView from "../../components/playlists/PlaylistView";
import {Link} from 'react-router-dom';
import MyButton from "../../ui/button/MyButton";

const ControlledPlaylist = () => {
    const {isLoading, data} = useGetPlaylistsQuery()
    console.log(isLoading, data)

    return isLoading ? 
    <div style={{width: "inherit", height: "inherit", display: "flex"}}>
        <Spiner/>
    </div> : 
        <div>
            <h2>Плейлісти</h2>
            <Link to="/playlist/new"><MyButton>Створити плейліст</MyButton></Link>
            <div style={{
                            display: "flex", 
                            gap: "10px", 
                            justifyContent: "space-between", 
                            flexWrap: "wrap",
                            margin: "10px 0"
                        }}>
            {data.PlaylistFind.map(playlist => (
                playlist._id && playlist.name ?
                <PlaylistView key={playlist._id} playlist={playlist}/> : 
                null 
            ))}
        </div>
    </div>

}

export default ControlledPlaylist