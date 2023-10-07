import { authSlice } from "../authSlice"
import { api } from "../api"
import { actionAboutMe } from "./actionAboutMe"

export const actionFullLogin = (login, password) =>
async dispatch => {
    const token = await dispatch(api.endpoints.login.initiate({login, password})) 
    if (token?.data?.login){
        dispatch(authSlice.actions.login(token.data.login))
        await dispatch(actionAboutMe()) 
    }
}