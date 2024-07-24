import { configureStore } from '@reduxjs/toolkit'
import Shopreducer from '../feature/Shop/ShopSlice'
import datereducer from '../feature/Date/DateSlice'
import popupreducer from '../feature/popup/PopupSlice'
// import { authSlice } from "../features/authSlice";
import userReducer from '../state/userSlice'; // Import userSlice

import authReducer from '../state/authSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'] // only auth will be persisted
}
 


const persistedReducer = persistReducer(persistConfig, authReducer)
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store =  configureStore({
  reducer: {
    auth: persistedReducer,
    user: persistedUserReducer, // Include user slice in the store
  },
})


export const persistor = persistStore(store)
