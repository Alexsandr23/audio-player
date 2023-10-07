import React from "react";
import MyButton from "./MyButton";
import PauseIcon from '@mui/icons-material/Pause';

const BtnPause = ({...props}) => {
    return (
        <>
            <MyButton style={{padding: "0"}}{...props}><PauseIcon/></MyButton>
        </>
        
    )
}

export default BtnPause