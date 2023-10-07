import { createSlice} from '@reduxjs/toolkit';

export const backendUrl = "http://player.node.ed.asmer.org.ua/"
export const audio = new Audio()

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        isPlaying: false,
        isStopped: true,
        duration: 0,
        track: null,
        playlist: {
            _id:"",
            url:"",
            tracks:[]
        },
        playlistIndex: 0,
        currentTime: 0,
        volume: 50
    },
    reducers: {
        play(state) {
            if (state.track && state.track.url) {
              if (audio.src !== `${backendUrl}${state.track.url}`) {
                audio.src = `${backendUrl}${state.track.url}`
                audio.load()
              }
              audio.volume = state.volume
              audio.play()
              state.isPlaying = true
              state.isStopped = false
            }
          },
        pause (state) {
            audio.pause()
            state.isPlaying = false
        },
        stop (state) {
            audio.pause()
            state.currentTime = 0
            state.isPlaying = false
            state.isStopped = true
        },
        setTrack (state, {payload}) {
            state.track = payload
        },
        setDuration (state, {payload}) {
            state.duration = payload
        },
        nextTrack (state) {
            const nextIndex = state.playlistIndex + 1
            if (state.playlist.tracks[nextIndex]) {
                state.track = state.player.playlist.tracks[nextIndex]
                state.playlistIndex = nextIndex
            }
        },
        prevTrack (state) {
            const prevIndex = state.playlistIndex - 1
            if (state.playlist.tracks[prevIndex]) {
                state.track = state.playlist.tracks[prevIndex]
                state.playlistIndex = prevIndex
            }
        },
        setPlayList (state, {payload}) {
            state.playlist = payload
        },
        setCurrentTime (state, {payload}) {
            state.currentTime = payload
            if (audio.currentTime !== payload) {
                audio.currentTime = payload
                state.currentTime = payload
            }
        },
        setVolume (state, {payload}) {
            audio.volume = payload
            state.volume = payload
        }
    }
})

export const {
    play, 
    pause, 
    stop, 
    setTrack, 
    setDuration, 
    nextTrack, 
    prevTrack, 
    setPlayList, 
    setCurrentTime,
    setVolume } = playerSlice.actions

export default playerSlice.reducer
