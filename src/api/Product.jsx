import axios from "axios";


export const createProduct = async (token, form) => await axios.post('https://shop-api-beige.vercel.app/api/product', form, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const listProduct = async (token, count = 20) => await axios.get('https://shop-api-beige.vercel.app/api/products/' + count, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const readProduct = async (token, id) => await axios.get('https://shop-api-beige.vercel.app/api/product/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const updateProduct = async (token, id, form) => await axios.put('https://shop-api-beige.vercel.app/api/product/' + id, form, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const removeProduct = async (token, id) => await axios.delete('https://shop-api-beige.vercel.app/api/product/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const uploadfiles = async (token, form) => await axios.post('https://shop-api-beige.vercel.app/api/images', {
    image: form
}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const removeFiles = async (token, public_id) => await axios.post('https://shop-api-beige.vercel.app/api/removeimages', {
    public_id
}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const searchFilters = async (arg) => await axios.post('https://shop-api-beige.vercel.app/api/search/filters/' , arg)


export const listproductBy = async (sort,order,limit) => await axios.post('https://shop-api-beige.vercel.app/api/productby' , 
    {
        sort,
        order,
        limit
    }
)