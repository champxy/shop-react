import React, { useEffect, useState } from 'react';
import { listproductBy } from '../../api/Product';
import ProductCard from '../card/ProductCard';
import SwiperShowProduct from '../../utils/SwiperShowProduct';
import { SwiperSlide } from 'swiper/react';

const NewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    handlegetNewProduct();
  }, []);

  const handlegetNewProduct = async () => {
    try {
      const res = await listproductBy('updatedAt', 'desc', 10);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwiperShowProduct>
      {products?.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
            <ProductCard product={item} />
          </div>
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default NewProduct;
