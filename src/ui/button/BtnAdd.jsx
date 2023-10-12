import React from "react";
import MyButton from "./MyButton";
import AddIcon from '@mui/icons-material/Add';

const BtnAdd = ({...props}) => {
    return (
        <>
            <MyButton {...props}><AddIcon/></MyButton>
        </>
        
    )
}

export default BtnAdd