import React from 'react'
import { SquareMinus, Minus, Plus } from 'lucide-react';
import useShopStore from '../../store/shop-store';
import { Link } from 'react-router-dom'
import { Numberformat } from '../../utils/number';


const CartCard = () => {
    const carts = useShopStore(state => state.carts)
    const actionUpdateQuantity = useShopStore(state => state.actionUpdateQuantity)
    const actionRemoveProduct = useShopStore(state => state.actionRemoveProduct)
    const actionGetTotalPrice = useShopStore(state => state.actionGetTotalPrice)

    return (
        <div className="p-6 max-w-lg mx-auto  rounded-xl  space-y-6">
            <div className='max-w-4xl mx-auto p-4'>
                <div className='flex justify-center'>
                    <h1 className="text-center text-3xl font-semibold mb-6">Your Cart</h1>
                </div>
                <div className='border rounded-lg p-4 '>

                    {/* Cart Items */}
                    {carts.map((item, index) => (
                        <div key={index} className='bg-white p-4 rounded-lg mb-4'>
                            {/* Item Row */}
                            <div className='relative flex flex-col sm:flex-row justify-between items-start w-full'>
                                {/* Left: Image and Details */}
                                <div className='flex gap-4 items-center w-full sm:w-auto'>
                                    <img
                                        src={item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150'}
                                        alt='product'
                                        className='w-20 h-20 rounded-md object-cover'
                                    />
                                    <div className='flex-grow'>
                                        <p className='text-lg sm:text-base font-semibold break-words'>{item.title}</p>
                                        <p className='text-sm sm:text-xs text-gray-500 break-words'>{item.description}</p> {/* เพิ่ม break-words */}
                                    </div>
                                </div>

                                {/* Right: Remove Icon */}
                                <div className='absolute -top-5 -right-6 text-red-600'>
                                    <SquareMinus
                                        className='cursor-pointer hover:text-red-800 transition duration-200'
                                        size={20}
                                        onClick={() => actionRemoveProduct(item.id)}
                                    />
                                </div>
                            </div>


                            {/* Quantity & Price */}
                            <div className='flex justify-between items-center mt-4'>
                                {/* Quantity Controls */}
                                <div className='flex items-center border rounded-md'>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                        className='p-2 bg-gray-100 hover:bg-red-500 hover:text-white transition duration-200'
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className='px-4'>{item.count}</span>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                        className='p-2 bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-200'
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                {/* Price */}
                                <div className='text-lg sm:text-base font-bold text-blue-500'>
                                    ฿ { Numberformat(item.price * item.count) }
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Total Price */}
                  
                   {
                    carts.length > 0 ? (
                      <div>
                        <div className='flex justify-between items-center mt-6'>
                          <span className='text-xl sm:text-base'>Total</span>
                          <span className='text-2xl sm:text-xl font-bold text-green-700'>฿ {Numberformat(actionGetTotalPrice())}</span>
                        </div>
                  
                        <Link to='/cart'>
                          <button className='bg-blue-500 text-white w-full p-3 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300'>
                            Proceed to Checkout
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className='text-center text-lg text-gray-500 '>
                        Your cart is empty
                      </div>
                    )
                  }
                  


                  
                </div>
            </div>
        </div>
    )
}

export default CartCard;
