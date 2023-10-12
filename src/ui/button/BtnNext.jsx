import React from "react";
import MyButton from "./MyButton";
import SkipNextIcon from '@mui/icons-material/SkipNext';

const BtnNext = ({...props}) => {
    return (
        <>
            <MyButton {...props}><SkipNextIcon/></MyButton>
        </>
        
    )
}

export default BtnNext