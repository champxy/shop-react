import React, { useEffect, useState } from 'react';
import { listproductBy } from '../../api/Product';
import SwiperShowProductMain from '../../utils/SwiperShowProductMain';
import { SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion";
const BestSeller = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        handlegetBestSeller();
    }, []);

    const handlegetBestSeller = async () => {
        try {
            const res = await listproductBy('sold', 'desc', 12);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SwiperShowProductMain>
            {products?.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="flex justify-center p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
                        {item.images && item.images.length > 0 && (
                            <motion.div
                                className="box w-80 h-full object-cover rounded-lg shadow-lg"
                                animate={{
                                    scale: [1, 1.1, 1, 1.1, 1],
                                    rotate: [0, 0, 10, -10, 0],
                                    borderRadius: ["0%", "20%", "50%", "20%", "0%"]
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    times: [0, 0.2, 0.5, 0.8, 1],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                <img
                                    src={item.images[0].url}
                                    alt={item.description || 'Product Image'}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </motion.div>

                        )}
                    </div>
                </SwiperSlide>
            ))}
        </SwiperShowProductMain>
    );
};

export default BestSeller;
