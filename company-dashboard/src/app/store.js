import { configureStore } from '@reduxjs/toolkit'
import Shopreducer from '../feature/Shop/ShopSlice'
import datereducer from '../feature/Date/DateSlice'
import popupreducer from '../feature/popup/PopupSlice'


export default configureStore({
  reducer: {
    shop: Shopreducer,
    date: datereducer,
    popup: popupreducer,
    // user: editreducer
  },
})