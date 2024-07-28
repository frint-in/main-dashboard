import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
// import { authSlice } from "../features/authSlice";
import authReducer from '../state/authSlice'
import companyReducer from '../state/companySlice'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
  key: 'auth',
  storage,
};

const companyPersistConfig = {
  key: 'company',
  storage,
};

export const store =  configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    company: persistReducer(companyPersistConfig, companyReducer),
  },
})


export const persistor = persistStore(store)
