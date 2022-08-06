import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
    isLoggedIn: false,
    userInfor: '',
    userData: {},
};

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            return { ...state, isLoggedIn: true };
        },

        setAccessToken: (state, action) => {
            return { ...state, userInfor: action.payload };
        },

        setUserData: (state, action) => {
            return { ...state, userData: action.payload };
        },

        setLogout: (state, action) => {
            return { ...state, isLoggedIn: false, userInfor: '' };
        },
    },
});

export const { setIsLoggedIn, setAccessToken, setUserData, setLogout } = songSlice.actions;

export default songSlice.reducer;
