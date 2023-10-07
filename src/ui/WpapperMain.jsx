import React from "react";

const WrapperMain = ({children}) => {
    return (
        <div style={{display: "flex", flex: "1", gap: "7px", color: "#fff", marginTop: "72px"}}>
            {children}
        </div>
    )
}
export default WrapperMain