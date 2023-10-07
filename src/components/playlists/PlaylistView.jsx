import React from "react";
import {Link} from 'react-router-dom';
import "../../App.css"



const PlaylistView = ({playlist}) => {
       
    return (
        <Link to= {`/playlist/${playlist._id}`} 
        className="bgElement"
        style={{
                    border: "1px solid #fff", 
                    padding: "0 5px 5px", 
                    flex: "1", 
                    flexBasis: "1", 
                    textDecoration: "none", 
                    color: "#fff", 
                }}>
            <p>{playlist.name}</p>
            <p>Опис: {playlist.description || `------`}</p>
        </Link>
    )
}

export default PlaylistView