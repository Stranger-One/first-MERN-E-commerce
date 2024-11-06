import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        userData: null
    },
    reducers:{
        setIsAuthenticated: (state, action) =>{
            state.isAuthenticated = action.payload
        },
        setIsLoading: (state, action) =>{
            state.isLoading = action.payload
        },
        setUserData: (state, action) =>{
            state.userData = action.payload
        }
    }
})

export const { setIsAuthenticated, setIsLoading, setUserData } = authSlice.actions;
export default authSlice.reducer;