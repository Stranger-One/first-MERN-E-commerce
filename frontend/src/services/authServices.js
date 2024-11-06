import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`
});


export const registerUser = async (username, email, password) => {
    try {
        const response = await axiosInstance.post('/register', {username, email, password });
        if (response.data.success) {
            console.log(response.data.message);
            // return response.data.data
            return response.data.success
        }
    } catch (error) {
        console.error("Error in register User ", error);
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        if (response.data.success) {
            console.log(response.data.message);
            return response.data
        }
    } catch (error) {
        console.error("Error in login User", error);
    }
}

export const checkUserAuth = async (token) => {
    try {
        const response = await axiosInstance.get('/check-auth', {
            params: {
                token
            },
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            }
          });
        if (response.data.success) {
            console.log(response.data.message);
            // return response.data.data
            return response.data.user
        }
    } catch (error) {
        console.error("Error in check User ", error);
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post('/logout');
        if (response.data.success) {
            console.log(response.data.message);
            // return response.data.data
            return response.data.success
        }
    } catch (error) {
        console.error("Error in logout User ", error);
    }
}