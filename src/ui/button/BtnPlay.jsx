import React from "react";
import MyButton from "./MyButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const BtnPlay = ({...props}) => {
    return (
        <>
            <MyButton style={{padding: "0"}}{...props}><PlayArrowIcon/></MyButton>
        </>
        
    )
}

export default BtnPlay