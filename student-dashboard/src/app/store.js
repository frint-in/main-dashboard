import { configureStore } from '@reduxjs/toolkit'
import Shopreducer from '../feature/Shop/ShopSlice'
import datereducer from '../feature/Date/DateSlice'
import popupreducer from '../feature/popup/PopupSlice'

import authReducer from '../state/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer 
  },
})