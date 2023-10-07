import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore, FLUSH,  
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from 'redux-persist';
import { playerSlice } from './playerSlice';
import { authSlice } from './authSlice';
import { api } from './api'



export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authSlice.name]: persistReducer({key: "auth", storage}, authSlice.reducer),
        [playerSlice.name]: persistReducer({key: "player", storage}, playerSlice.reducer),
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
            api.middleware]
})

const persistor = persistStore(store)
console.log(persistor)