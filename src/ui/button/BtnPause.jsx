import React from "react";
import MyButton from "./MyButton";
import PauseIcon from '@mui/icons-material/Pause';

const BtnPause = ({...props}) => {
    return (
        <>
            <MyButton{...props}><PauseIcon/></MyButton>
        </>
        
    )
}

export default BtnPause