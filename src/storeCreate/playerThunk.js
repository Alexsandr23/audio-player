import { play, setTrack, setPlaylist } from './playerSlice';


export const addAndPlayTrack = (track) => 
    async (dispatch) => {
        dispatch(setTrack(track))
        dispatch(play())
    }
export const actionSetPlaylist = (playlist) => 
    async (dispatch) => {
        dispatch(setPlaylist(playlist))
    }

export const actionPlayAudio = () => async (dispatch, getState) => {
  const { player } = getState();
  if (!player.isPlaying && player.track && player.track.url) {
      dispatch(play());
  }
}
