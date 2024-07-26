
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../state/authSlice';
import userReducer from '../state/userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);


