import React from 'react'
import { ScrollText } from 'lucide-react';
import useShopStore from '../../store/shop-store';
import { Link , useNavigate} from 'react-router-dom';
import { createUserCart } from '../../api/User';
import { toast } from 'react-toastify';
import { Numberformat } from '../../utils/number';


const ListCartProcess = () => {
    const carts = useShopStore(state => state.carts)
    const user = useShopStore(state => state.user)
    const token = useShopStore(state => state.token)
    const navigate = useNavigate()
    const actionGetTotalPrice = useShopStore(state => state.actionGetTotalPrice)
    // console.log(carts)
    // console.log({carts})
    const handleSaveCart = async () => {
        await createUserCart(token,{cart: carts})
        .then(res => 
        {
            toast.success('Cart Saved', {position: 'top-center'})
            navigate('/checkout')

        }
        )
        .catch(err => {
            toast.error(err.response.data.msg, {position: 'top-center'})
        })
    }


    // console.log(user)

    return (
        <div className='bg-gray-50 rounded-md p-4 max-w-7xl mx-auto'>
            {/* Header */}
            <div className='flex gap-3 items-center mb-6'>
                <ScrollText size={30} />
                <span className='text-3xl font-bold'>You Have {carts.length} Items in Cart</span>
            </div>

            {/* Content */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left: Cart List */}
                <div className='col-span-2 max-h-[400px] overflow-y-auto pr-4'>
                    {carts.map((item, index) => (
                        <div key={index} className='bg-white p-4 rounded-md mb-2 shadow-sm'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src={item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150'}
                                        alt='product'
                                        className='w-20 h-20 rounded-md object-cover'
                                    />
                                    <div className=''>
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-sm text-gray-500'>฿ { Numberformat(item.price) } x {item.count}</p>
                                    </div>
                                </div>
                                <div className='font-bold text-blue-500'> ฿ { Numberformat(item.price * item.count) }</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Cart Summary */}
                <div className='bg-white rounded-md shadow-lg p-6 sticky top-4'>
                    <p className='text-3xl font-bold mb-4'>Summary</p>
                    <div className='flex justify-between mb-6 items-center'>
                        <span>Total Price</span>
                        <span className='text-2xl font-bold'>฿ {actionGetTotalPrice()}</span>
                    </div>

                    {
                        user ? (
                            <Link>
                               {
                                      carts.length > 0 ? (
                                        <button onClick={handleSaveCart} className='bg-green-500 text-white w-full p-3 rounded-md mt-2 hover:bg-green-600 transition duration-200'>
                                         Checkout
                                        </button>
                                      ) : (
                                        <button className='bg-gray-500 text-white w-full p-3 rounded-md mt-2 hover:bg-gray-700 transition duration-200' disabled>
                                         Disabled
                                        </button>
                                      )
                               }
                            </Link>
                        ) : (
                            <Link to='/login'>
                                <button className='bg-blue-500 text-white w-full p-3 rounded-md mt-2 hover:bg-blue-600 transition duration-200'>
                                    Login to Checkout
                                </button>
                            </Link>
                        )
                            
                    }

                    <Link to='/shop'>
                        <button className='bg-red-500 text-white w-full p-3 rounded-md mt-2 hover:bg-red-600 transition duration-200'>
                            Revise
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ListCartProcess;
