import React from 'react'
import useShopStore from '../../store/shop-store'
import { Numberformat } from '../../utils/number'
// React
import { motion } from "framer-motion"


const ProductCard = ({ product }) => {

  const actionAddtoCart = useShopStore(state => state.actionAddtoCart)

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
  >
    <div className='flex justify-center'>
      <div className='flex flex-col bg-white p-4 shadow-lg rounded-lg w-64 transition-transform duration-500 hover:scale-105 hover:shadow-xl'>
        {/* Product Image */}
        <div className='relative'>
          <img
            src={
              product.images.length > 0 ?
              product.images[0].url :
              'https://via.placeholder.com/300'
            }
            alt='product'
            className='w-full h-48 object-cover rounded-md'
          />
        </div>

        {/* Product Info */}
        <div className='mt-4'>
          <p className='text-lg font-semibold text-gray-800 truncate'>{product.title}</p>
          <p className='text-sm text-gray-500 mt-1 truncate'>{product.description}</p>
          <p className='text-lg font-bold text-blue-500 mt-2'>฿ {Numberformat(product.price)}</p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => actionAddtoCart(product)}
          className='bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition-colors duration-300'>
          Add to Cart
        </button>
      </div>
    </div>
    </motion.div>
  )
}

export default ProductCard;
