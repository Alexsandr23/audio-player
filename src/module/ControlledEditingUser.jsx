import React, {useState} from "react";
import EditingUserView from "../components/EditingUserView";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../storeCreate/authSlice";
import {history} from "../App"
import { actionSetNick } from "../storeCreate/helpers/actionSetNick"
import {stop} from "../storeCreate/playerSlice"


const ControlledEditingUser = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [newNick, setNewNick] = useState("")
    const setNick = () => {
        dispatch(actionSetNick(state.auth.payload.sub.id,newNick))
        setNewNick("")
    }

    const onLogout = () => {
        dispatch(stop())
        dispatch(logout())
        history.push("/")
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