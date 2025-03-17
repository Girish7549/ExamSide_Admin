import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials) =>{
        
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading: false,
        user: null,
        error: null
    }
})

export default userSlice.reducer