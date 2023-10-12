import React from "react";
import { Link } from 'react-router-dom';

export const PlaylistView = ({ playlist }) => {

    return (
        <Link to={`/playlist/${playlist._id}`}
            className="bgElement"
            style={{
                border: "1px solid #fff",
                padding: "0 5px 5px",
                flexBasis: "1",
                textDecoration: "none",
                color: "#fff",
                flex: "0 0 calc(23.33% - 10px)",
                width: "calc(23.33% - 10px)",
                padding: "5px",
            }}>
            <p>{playlist.name}</p>
            <p>Опис: {playlist.description || `------`}</p>
        </Link>
    );
};
