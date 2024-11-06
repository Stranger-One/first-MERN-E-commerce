import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/addresses`
});


export const addAddress = async (data) => {
  try {
    const response = await axiosInstance.post('/add', data);
    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data
    }
  } catch (error) {
    console.error("Error addign address:", error.message);
  }
};

export const getAddress = async (userId) => {
  try {
    const response = await axiosInstance.get(`/get/${userId}`);
    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data
    }
  } catch (error) {
    console.error("Error getting address:", error.message);
  }
};

export const updateAddress = async (userId, addressId, newData) => {
  try {
    const response = await axiosInstance.put(`/update/${userId}/${addressId}`, newData);
    console.log(response.data.message);
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error("Error updating address:", error.message);
  }
};

export const deleteAddress = async (userId, addressId) => {
  try {
    const response = await axiosInstance.delete(`/delete/${userId}/${addressId}`);
    console.log(response.data.message);
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error("Error updating address:", error.message);
  }
};