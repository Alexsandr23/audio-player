import React, {useState} from "react";
import EditingUserView from "../components/EditingUserView";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../storeCreate/authSlice";
import {history} from "../App"
import { useSetUserNickMutation } from "../storeCreate/api";
import { setAboutMe } from "../storeCreate/authSlice";
import { actionAboutMe } from "../storeCreate/helpers/actionAboutMe";



const ControlledEditingUser = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [nickMutation, {isLoading, data}] = useSetUserNickMutation()
    const [newNick, setNewNick] = useState("")
    console.log(isLoading, data)
    
    

    const setNick = async () => {
        try {
            const response = await nickMutation({_id: state.auth.payload.sub.id, nick: newNick})
            console.log(response)
            setNewNick("")
            if (response.data) {
                await dispatch(actionAboutMe())
                
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const onLogout = () => {
        dispatch(logout())
        history.goBack()
    }
    return (
        <>
            <EditingUserView 
                onLogout={onLogout} 
                setNick={setNick}
                newNick={newNick}
                setNewNick={setNewNick}
                ></EditingUserView>
        </>
    )
}

export default ControlledEditingUser