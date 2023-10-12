import React from "react"
import { useState } from "react"
import MyInput from "../ui/input/MyInput"
import MyButton from "../ui/button/MyButton"
import PasswordConfirm from "./PasswordConfirm"
import { useRegistrationMutation } from "../storeCreate/api"
import { useDispatch } from "react-redux"
import { actionFullLogin } from "../storeCreate/helpers/actionFullLogin"
import { logout } from "../storeCreate/authSlice"

const RegistrationForm = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)
    const [strongPassword, setStrongPassword] = useState(false)
    const [registrationMutation, {isLoading, data}] = useRegistrationMutation()
    console.log(isLoading, data)
 
    const dispatch = useDispatch()

    const passwordMatch = (matchStatus) => {
        setIsPasswordMatch(matchStatus)
      }
    const fullReg = async () => {
        if (!login || !password) {
            setLogin("")
            setPassword("")
            return
        }
        try {   
            if (isPasswordMatch && strongPassword) {
                const response = await registrationMutation({login: login, password: password})
                if (response.data) {
                    dispatch(actionFullLogin(login, password)) 
                } else {
                    dispatch(logout())
                }
            }
        } catch (error) {
            console.error(error)
        }

    }
        
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        gap: "10px",
    }
    return (
        <div style={containerStyle}>
            <div  style={{width: "220px", border: "2px solid black", borderRadius: "5px"}}>
                <MyInput placeholder="Логін" value={login} onChange={e => setLogin(e.target.value)} style = {{border: "none"}}/>
            </div>
            <PasswordConfirm onPasswordChange={password => setPassword(password)} onPasswordMatch={passwordMatch} onStrongPassword ={obj => setStrongPassword(obj)}/>
            <MyButton onClick = {fullReg}>
                Зареєструватися
            </MyButton>
        </div>
    )
}

export default RegistrationForm