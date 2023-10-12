import { api } from "../api"


export const actionGetTrackId =  (_id) => 
async (dispatch) =>{
     try {
          const result = await dispatch(api.endpoints.getTrackId.initiate({ _id }));
          const data = result.data.TrackFindOne
          return data
        } catch (error) {
          console.error(error);
        }
}