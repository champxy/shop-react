import axios from 'axios';


export const currentUser =async (token)=> await axios.post('https://shop-api-beige.vercel.app/api/current-user',
    {},
    {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
)

export const currentAdmin =async (token)=>  await axios.post('https://shop-api-beige.vercel.app/api/current-admin',
    {},
    {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
)