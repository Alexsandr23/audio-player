import React from "react";
import MyButton from "./MyButton";
import AddIcon from '@mui/icons-material/Add';

const BtnAdd = ({...props}) => {
    return (
        <>
            <MyButton style={{padding: "0"}}{...props}><AddIcon/></MyButton>
        </>
        
    )
}

export default BtnAdd