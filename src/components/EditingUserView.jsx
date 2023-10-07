import React from "react";
import MyButton from "../ui/button/MyButton";
import MyInput from "../ui/input/MyInput";
import {Basic} from "../module/Dropzone/Basic"

const EditingUserView = ({onLogout, setNick,  newNick, setNewNick}) => {

    return (
        <>  
            <h3>РЕДЕГУАННЯ ОСОБИСТИХ ДАНХ</h3>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"}}>
                <div>
                    <Basic texInsideBlock={"Додати фото"}></Basic>
                </div>
                <div>
                    <MyInput 
                        placeholder="нікнейм"
                        value={newNick}
                        onChange={(e) => setNewNick(e.target.value)}
                    ></MyInput>
                    <MyButton onClick={setNick}>Редигувати нікнейм</MyButton>
                </div>
                <div>
                    <MyInput 
                        placeholder="новий пароль"
                    ></MyInput>
                    <MyButton >Редигувати пароль</MyButton>
                
                </div>
                <MyButton onClick={onLogout}>Вийти</MyButton>
            </div>

        </>
    )
}

export default EditingUserView