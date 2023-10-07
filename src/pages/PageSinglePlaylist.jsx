import React from "react";
import "../App.css"
import {useParams} from 'react-router-dom';
import ControlledSinglePlaylist from "../module/playlists/ControlledSinglePlaylist";

const PageSinglePlaylist= () => {
    const {id} = useParams()
    return (
        <div className="stylePage">
            <ControlledSinglePlaylist id={id}></ControlledSinglePlaylist>
        </div>
    )
}

export default PageSinglePlaylist