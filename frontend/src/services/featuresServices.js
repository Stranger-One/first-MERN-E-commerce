import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/features`,
})

export const addNewFeature = async (image)=>{
    try {
        const response = await axiosInstance.post("/add", {
            image
        })
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
        
    } catch (error) {
        console.error('Error adding feature image: ', error);
    }
}

export const getAllFeatures = async ()=>{
    try {
        const response = await axiosInstance.get("/get")
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
        
    } catch (error) {
        console.error('Error getting feature image: ', error);
    }
}

export const deletefeatureImage = async (id)=>{
    try {
        const response = await axiosInstance.delete(`/delete/${id}`)
        if (response.data.success) {
            console.log(response.data.message);
            return response.data.data
        }
        
    } catch (error) {
        console.error('Error deleting feature image: ', error);
    }
}