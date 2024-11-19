import axios from 'axios';
export const payment =async (token)=> await axios.post('https://shop-api-beige.vercel.app/api/user/create-payment-intent',
    {},
    {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
)
