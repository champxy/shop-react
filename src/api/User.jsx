import axios from "axios";


export const createUserCart = async (token, cart) => await axios.post('https://shop-api-beige.vercel.app/api/user/cart', cart, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const listUserCart = async (token) => await axios.get('https://shop-api-beige.vercel.app/api/user/cart', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const saveAddress = async (token, address) => await axios.post('https://shop-api-beige.vercel.app/api/user/address', {address}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const saveOrder = async (token, payload) => await axios.post('https://shop-api-beige.vercel.app/api/user/order', payload, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const getOrders = async (token) => await axios.get('https://shop-api-beige.vercel.app/api/user/order', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

