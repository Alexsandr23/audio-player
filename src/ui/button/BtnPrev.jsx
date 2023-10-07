import React from "react";
import MyButton from "./MyButton";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const BtnPrev = ({...props}) => {
    return (
        <>
            <MyButton style={{padding: "0"}}{...props}><SkipPreviousIcon/></MyButton>
        </>
        
    )
}

export default BtnPrev