import { api } from "../api"
import { actionAboutMe } from "./actionAboutMe"


export  const actionSetNick = (_id, nick) => 
async dispatch => { 
    const response = await dispatch(api.endpoints.setUserNick.initiate({_id, nick})) 
    if (response) {
        dispatch(actionAboutMe())
    }

}
