import axios from "axios"

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/products`
})


export const addProduct = async (data) => {
    try {
        const response = await axiosInstance.post('/add', data)
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log("Failed to create product: ", error);
    }
}

export const getProduct = async (productId) => {
    try {
        const response = await axiosInstance.get(`/get/${productId}`)
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log("Failed to get product: ", error);
    }
}

export const getAllProducts = async (filterByCategory=[], filterByBrand=[], sort='aToZ' ) => {
    try {
        let sortBy = { title: 1 }
        switch (sort) {
            case "lowToHigh":
                sortBy = { salePrice: 1 }
                break;
            case "highToLow":
                sortBy = { salePrice: -1 }
                break;
            case "aToZ":
                sortBy = { title: 1 }
                break;
            case "zToA":
                sortBy = { title: -1 }
                break;
            default:
                sortBy = { title: 1 }
                break;
        }

        const response = await axiosInstance.get('/get', {
            params: {
                category: JSON.stringify(filterByCategory),
                brand: JSON.stringify(filterByBrand),
                sort: JSON.stringify(sortBy)
            }
        })
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log("Failed to get all products: ", error);
    }
}

export const updateProduct = async (productId, newFormData) => {
    try {
        const response = await axiosInstance.put(`/update/${productId}`, newFormData)
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log("Failed to update product: ", error);
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/delete/${productId}`)
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
    } catch (error) {
        console.log("Failed to delete product: ", error);
    }
}
