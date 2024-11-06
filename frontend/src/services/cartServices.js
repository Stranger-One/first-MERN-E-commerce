import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/carts`
})

export const createCart = async (userId) => {
    try {
        const response = await axiosInstance.post(`/create/${userId}`)
        if(response.data.success){
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log('failed to add cart: ', error);
        
    }
}
export const addCart = async (data) => {
    try {
        const response = await axiosInstance.post("/add", data)
        if(response.data.success){
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log('failed to add cart: ', error);
        
    }
}
export const getCart = async (userId) => {
    try {
        const response = await axiosInstance.get(`/get/${userId}`)
        if(response.data.success){
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log('failed to get cart: ', error);
        
    }
}
export const updateCart = async (userId, productId, quantity) => {
    try {
        const response = await axiosInstance.put("/update-cart", {
            userId, productId, quantity
        })
        if(response.data.success){
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log('failed to update cart: ', error);
        
    }
}
export const deleteCart = async (userId, productId) => {
    try {
        const response = await axiosInstance.delete(`/delete/${userId}/${productId}`)
        if(response.data.success){
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log('failed to delete cart: ', error);
        
    }
}

export const clearCart = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/clear/${userId}`)
        if(response.data.success){
            console.log(response.data.message);
            // return response.data.data
        }
    } catch (error) {
        console.log('failed to delete cart: ', error);
        
    }
}