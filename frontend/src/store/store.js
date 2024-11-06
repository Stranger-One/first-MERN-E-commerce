import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import adminGlobalSlice from "./adminGlobalSlice.js"
import userGlobalSlice from "./userGlobalSlice.js"


const store = configureStore({
    reducer:{
        auth: authSlice,
        adminGlobal: adminGlobalSlice,
        userGlobal: userGlobalSlice
    }
})

export default store