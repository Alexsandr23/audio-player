import React from "react"
import { useState } from "react"
import MyInput from "../ui/input/MyInput"
import MyButton from "../ui/button/MyButton"
import {useLoginMutation } from "../storeCreate/api"
import { useDispatch } from "react-redux"
import { logout } from "../storeCreate/authSlice"
import { actionFullLogin } from "../storeCreate/helpers/actionFullLogin"


const LoginForm = () => {
    const [loginValue, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginQuery, {isLoading, data}] = useLoginMutation()
    console.log(isLoading, data)
    
    const dispatch = useDispatch()

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        gap: "10px",
    }

    const clickLogin = async () => {
        if (!loginValue || !password) {
            setLogin("")
            setPassword("")
            return
        }
        try {
           const response = await loginQuery({login: loginValue, password})
            if (response.data) {
                dispatch(actionFullLogin(loginValue, password))
                setLogin("")
                setPassword("")
                // dispatch(actionAboutMe())
            }
        } catch (error) {
            console.error("Ошибка авторизации", error)
            dispatch(logout())
        }
        setLogin("")
        setPassword("")
    }

    return (
        <div style={containerStyle}>
            <MyInput placeholder="Логін" value={loginValue} onChange={e => setLogin(e.target.value)}/>
            <MyInput placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <MyButton onClick={clickLogin}>
                Війти
            </MyButton>

        </div>
    )
}

export default LoginForm