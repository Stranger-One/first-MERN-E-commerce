import { createSlice } from "@reduxjs/toolkit"

const userGlobalSlice = createSlice({
    name: "userGlobal",
    initialState: {
        featureImages: [],
        products: [],
        cartProducts: [],
        userAddresses: [],
        selectedAddress: null,
        pageLoading: true
    },
    reducers: {
        setCartProduct: (state, action) => {
            state.cartProducts = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setUserAddresses: (state, action) => {
            state.userAddresses = action.payload;
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        setCartProductQuantity: (state, action) => {
            console.log(action.payload);
            state.cartProducts.map(product => {
                if (product.productId === action.payload.id) {
                    product.quantity = action.payload.quantity;
                }
            })
        },
        setPageLoading: (state, action) => {
            state.pageLoading = action.payload;
        }
    }

})

export const { setCartProduct, setProducts, setUserAddresses, setSelectedAddress, setCartProductQuantity, setPageLoading } = userGlobalSlice.actions;
export default userGlobalSlice.reducer;