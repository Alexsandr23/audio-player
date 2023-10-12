import React from "react";
import SinglePlaylistView from "../../components/playlists/SinglePlaylistView";
import { useGetPlaylistIdQuery } from "../../storeCreate/api";
import Spiner from "../../ui/Spiner";


const ControlledSinglePlaylist = ({id}) => {
  const { data, isLoading } = useGetPlaylistIdQuery({_id: id})
  
    return isLoading ?
        <div style={{width: "inherit", height: "inherit", display: "flex"}}>
            <Spiner/>
        </div> :
        <div>
            <SinglePlaylistView playlist={data.PlaylistFindOne}></SinglePlaylistView>          
        </div>
}

export default ControlledSinglePlaylist