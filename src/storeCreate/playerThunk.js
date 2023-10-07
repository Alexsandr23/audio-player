import { play, pause, stop, setTrack, setPlaylist, setCurrentTime, nextTrack, prevTrack, setVolume } from './playerSlice';


export const addAndPlayTrack = (track) => 
    async (dispatch) => {
        dispatch(setTrack(track))
        dispatch(play())
    }


export const actionPlayAudio = () => async (dispatch, getState) => {
  const { player } = getState();
  if (!player.isPlaying && player.track && player.track.url) {
      dispatch(play());
  }
}
