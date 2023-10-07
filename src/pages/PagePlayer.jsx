import React from "react";
import "../App.css"
import ControlledPlayer from "../module/player/ControlledPlayer";

const PagePlayer = () => {
    return (
        <div className="stylePage" style={{display: "flex", flexDirection: "column", gap: "7px"}}>
            <ControlledPlayer></ControlledPlayer>
        </div>
        
    )
}

export default PagePlayer