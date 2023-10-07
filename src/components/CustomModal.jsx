import React from "react";
import { useState } from "react";
import MyButton from "../ui/button/MyButton";
import MyModal from "./MyModal";

const CustomModal = ({render, children, isLogin}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <MyButton onClick={() => setOpen(true)}>{children}</MyButton>
            <MyModal 
            open={open} 
            onClose={() => setOpen(false)} 
            render={render} 
            isLogin={isLogin} 
            >
                {children}
            </MyModal>
        </>
    )
}

export default CustomModal