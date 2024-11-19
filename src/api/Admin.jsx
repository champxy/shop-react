import axios from "axios";

export const getOrdersbyAdmin = async (token) => await axios.get(`https://shop-api-beige.vercel.app/api/admin/orders`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const updateOrderStatus = async (form, token) => await axios.put(`https://shop-api-beige.vercel.app/api/admin/order-status`, form, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const getlistAllUser = async (token) => await axios.get(`https://shop-api-beige.vercel.app/api/users`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const changeStatusUser = async (token,value) => await axios.post(`https://shop-api-beige.vercel.app/api/change-status`,value, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const changeRoleUser = async (token,value) => await axios.post(`https://shop-api-beige.vercel.app/api/change-role`,value, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
