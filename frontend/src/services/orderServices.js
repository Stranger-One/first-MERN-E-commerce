import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/orders`
});


export const addOrder = async (data) => {
  try {
    const response = await axiosInstance.post('/addOrder', data);
    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data
    }
  } catch (error) {
    console.error("Error adding order:", error);
  }
}

export const getOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(`/get/${userId}`);
    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data
    }
  } catch (error) {
    console.error("Error getting order:", error);
  }
}

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get('/getAllOrders');
    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data
    }
  } catch (error) {
    console.error("Error getting orders:", error);
  }
}

export const updateOrder = async (orderId, orderStatus) => {
  try {
    const response = await axiosInstance.put('/update', {orderId, orderStatus});
    if (response.data.success) {
      console.log(response.data.message);
      return response.data.data
    }
  } catch (error) {
    console.error("Error update order:", error);
  }
}

