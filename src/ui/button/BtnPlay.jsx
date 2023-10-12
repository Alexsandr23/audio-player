import React from "react";
import MyButton from "./MyButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const BtnPlay = ({...props}) => {
    return (
        <>
            <MyButton {...props}><PlayArrowIcon/></MyButton>
        </>
        
    )
}

export default BtnPlay