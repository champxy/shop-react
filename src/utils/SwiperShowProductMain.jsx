import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const SwiperShowProductMain = ({ children }) => {
  return (

    <Swiper
      pagination={{
        dynamicBullets: true,
      }}

      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper h-80 object-cover rounded-lg mb-2"
    >
        
        {children}
    </Swiper>

  )
}

export default SwiperShowProductMain