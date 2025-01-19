import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import counterSlice from './counterSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        counter:counterSlice
    }
})
export default store;