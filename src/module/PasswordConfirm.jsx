import React from "react";
import { useState } from "react";
import MyInput from "../ui/input/MyInput";
import { passwordStrong} from "../helpers/passwordStrong"
  

const PasswordConfirm = ({onPasswordChange, onPasswordMatch, onStrongPassword}) => {
    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValide] = useState("")
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [strongPassword, setStrongPassword] = useState(true)
    console.log(passwordMatch, strongPassword)
    return (
        <>
            <div style={{width: "173px", border: password.length === 0 || strongPassword ? "2px solid black" : "2px solid red", borderRadius: "5px"}} >
                <MyInput 
                    type="password"
                    onChange={e => {
                        setPassword(e.target.value)
                        setPasswordMatch(e.target.value === passwordValid)
                        setStrongPassword(passwordStrong(e.target.value))
                        onPasswordChange(e.target.value)
                        onPasswordMatch(e.target.value === passwordMatch)
                        onStrongPassword(passwordStrong(e.target.value))
                    }}
                    style = {{border: "none"}}
                    placeholder = "Пароль"
                    />
            </div>
            <div style={{width: "173px", border: passwordValid !== 0 && passwordMatch ? "2px solid black" : "2px solid red", borderRadius: "5px"}} >
                <MyInput 
                    type="password" 
                    onChange={e => {
                        setPasswordValide(e.target.value)
                        const match = e.target.value === password
                        setPasswordMatch(match)
                        onPasswordMatch(match)
                        
                    }}
                    style = {{border: "none"}}
                    placeholder = "Повторити пароль"
                    />
            </div>
        </>
    )
}

export default PasswordConfirm