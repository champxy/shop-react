import React, { useState, useEffect } from 'react';
import { listUserCart, saveAddress } from '../../api/User';
import useShopStore from '../../store/shop-store';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Numberformat } from '../../utils/number';
const SummaryCard = () => {

    const token = useShopStore(state => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        handleGetUserCart(token)
    }, [])

    const handleGetUserCart = async () => {
        listUserCart(token).then(res => {
            // console.log(res)
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        }
        ).catch(err => {
            console.log(err)
        })
    }
    // console.log(products)

    const handleSaveAddress = async () => {
        if (!address) {
            toast.warning('Address is required',
                { position: 'top-center' }
            )
            return
        }
        await saveAddress(token, address).then(res => {
            // console.log(res)
            toast.success(res.data.msg)
            setAddressSaved(true)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <div className='flex gap-4'>
                {/* left - Address */}
                <div className='w-2/4'>
                    <div className='bg-white p-4 rounded-md shadow-sm border'>
                        <h1 className='text-lg font-semibold mb-2'>Address</h1>
                        <textarea required
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full h-24 p-2 border rounded-md' placeholder='Enter your address'></textarea>
                        <button
                            onClick={handleSaveAddress}
                            className='bg-pink-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-pink-600'>Save Address</button>
                    </div>

                </div>
                {/* right - Summary */}
                <div className='w-2/4'>
                    <div className='bg-white p-4 rounded-md shadow-sm border'>
                        <h1 className='text-lg font-semibold mb-5'>Summary</h1>
                        {/* itemlist */}

                        {
                            products?.map((item, index) => (
                                <div key={index} className='flex justify-between items-end mb-4'>
                                    <div>
                                        <p className='font-semibold'>{item.product.title}</p>
                                        <p className='text-gray-400'>Qty : {item.count} x {Numberformat(item.product.price)}</p>
                                    </div>

                                    <div>
                                        <p className='text-red-500 font-semibold'>฿ {Numberformat(item.count * item.product.price)}</p>
                                    </div>
                                </div>
                            ))
                        }


                        <hr className='my-2' />
                        <div className='flex justify-between'>
                            <p>Shipping : </p>
                            <p>Free</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Discount : </p>
                            <p>Free</p>
                        </div>
                        <hr className='my-2' />
                        <div className='flex justify-between items-center text-red-500'>
                            <p className='font-bold text-2xl'>Total : </p>
                            <p className='font-bold text-2xl'>฿ {Numberformat(cartTotal)}</p>
                        </div>
                        <hr className='my-2' />
                        <button
                            onClick={() => navigate('/user/payment')}
                            disabled={!addressSaved}
                            className={`w-full text-white px-4 py-2 mt-2 rounded-md 
    ${addressSaved ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-300 cursor-not-allowed'}`}>
                            Submit
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
