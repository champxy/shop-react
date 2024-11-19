import React, { useEffect } from 'react';
import ProductCard from '../components/card/ProductCard';
import useShopStore from '../store/shop-store';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';

const Shop = () => {
  const getProducts = useShopStore(state => state.getProducts);
  const products = useShopStore(state => state.products);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      
      {/* Search bar */}
      <div className='w-full lg:w-1/4  shadow-md p-4 rounded-lg mb-4 lg:mb-0'>
        <SearchCard />
      </div>

      {/* Product list */}
      <div className='w-full lg:w-1/2 p-4 h-screen overflow-y-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center lg:text-left'>Products</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            products.map((item, index) =>
              <div className='transition-transform transform hover:scale-105' key={index}>
                <ProductCard product={item} />
              </div>
            )
          }
        </div>
      </div>

      {/* Cart */}
      <div className='w-full lg:w-1/4 shadow-md p-4 rounded-lg h-screen overflow-y-auto'>
        <CartCard />
      </div>
      
    </div>
  );
}

export default Shop;
