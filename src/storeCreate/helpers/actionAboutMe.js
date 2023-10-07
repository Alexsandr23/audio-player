import { api } from "../api"
import { setAboutMe } from "../authSlice"

export const actionAboutMe = () => 
    async (dispatch, getState) => {
        const {auth} = getState()
        if (auth.payload){
            const {id} = auth.payload.sub
            const response = await dispatch(api.endpoints.getUserById.initiate({_id: id}))
            if (!response.error) {
                console.log("Обновление данных о пользователе:", response.data.UserFindOne)
                dispatch(setAboutMe(response.data.UserFindOne));
              }
        }
    }
