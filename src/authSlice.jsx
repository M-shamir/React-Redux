import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access: localStorage.getItem('access') || null,
    refresh: localStorage.getItem('refresh') || null,
    userDetails: null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            const { access, refresh } = action.payload;
            state.access = access;
            state.refresh = refresh;
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
        },
        logout:(state)=>{
            state.access = null;
            state.refresh = null;
            state.userDetails = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
          },
    }
})

export const { login, logout, setUserDetails } = authSlice.actions;
export default authSlice.reducer;