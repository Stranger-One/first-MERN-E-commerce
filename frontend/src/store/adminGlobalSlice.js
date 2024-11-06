import { createSlice } from "@reduxjs/toolkit"

const adminGlobalSlice = createSlice({
    name: "adminGlobal",
    initialState: {
        currentEditProduct: {}
    },
    reducers: {
        setCurrentEditProduct: (state, action) => {
            state.currentEditProduct = action.payload;
        }
    }

})

export const { setCurrentEditProduct } = adminGlobalSlice.actions;
export default adminGlobalSlice.reducer;