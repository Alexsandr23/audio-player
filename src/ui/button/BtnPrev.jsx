import React from "react";
import MyButton from "./MyButton";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const BtnPrev = ({...props}) => {
    return (
        <>
            <MyButton {...props}><SkipPreviousIcon/></MyButton>
        </>
        
    )
}

export default BtnPrev