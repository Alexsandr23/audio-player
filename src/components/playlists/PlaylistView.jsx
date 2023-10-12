import React from "react";
import {Link} from 'react-router-dom';
import "../../App.css"



const PlaylistView = ({playlist}) => {
       
    return (
        <Link to= {`/playlist/${playlist._id}`} 
        className="bgElement"
        style={{
                    border: "1px solid #fff", 
                    padding: "5px",  
                    flexBasis: "1", 
                    textDecoration: "none", 
                    color: "#fff", 
                    flex: "0 0 calc(23.33% - 10px)",
                    width: "calc(23.33% - 10px)",
                }}>
            <p>{playlist.name}</p>
            <p>Опис: {playlist.description || `------`}</p>
        </Link>
    )
}

export default PlaylistView