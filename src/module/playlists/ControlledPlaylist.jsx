import React, {useState} from "react";
import { useGetPlaylistsMyQuery, useGetPlaylistQuery } from "../../storeCreate/api";
import Spiner from "../../ui/Spiner";
import PlaylistView from "../../components/playlists/PlaylistView";
import MyButton from "../../ui/button/MyButton";
import { useSelector } from 'react-redux'
import BossComponentPlaylist from "./BossComponentPlaylist";

const ControlledPlaylist = () => {
    const idUser = useSelector(store => store.auth.payload.sub.id)
    const {isLoading:isLoadingMyPlaylists, data: myPlaylistsData} = useGetPlaylistsMyQuery({idUser})
    const {isLoading, data} = useGetPlaylistQuery()
    const [showBoss, setShowBoss] = useState(true)

    const stylePlaulist = {
                display: "flex", 
                gap: "10px",  
                flexWrap: "wrap",
                margin: "10px 0"
            }
    

    return showBoss ?
        isLoadingMyPlaylists && isLoading ? 
        <div style={{width: "inherit", height: "inherit", display: "flex"}}>
            <Spiner/>
        </div> : 
            <div>
                <h2>Плейлісти</h2>
                <MyButton onClick={() => setShowBoss(false)}>Створити плейліст</MyButton>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={stylePlaulist}>    
                        {data && data.PlaylistFind.map(playlist => (
                            playlist._id && playlist.name ?
                            <PlaylistView key={playlist._id} playlist={playlist}/> : 
                            null 
                        ))}
                    </div>
                    <h5>Мої плейлісти</h5> 
                    <div style={stylePlaulist}>
                            
                        {myPlaylistsData && myPlaylistsData.PlaylistFind.map(playlist => (
                            playlist._id && playlist.name ?
                            <PlaylistView key={playlist._id} playlist={playlist}/> : 
                            null 
                        ))}
                    </div>
                </div>    
        </div> :
        <BossComponentPlaylist></BossComponentPlaylist>

}

export default ControlledPlaylist