import React from "react";

const WrapperMain = ({children}) => {
    return (
        <div style={{display: "flex", flex: "1", gap: "7px", color: "#fff", marginTop: "110px"}}>
            {children}
        </div>
    )
}
export default WrapperMain