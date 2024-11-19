import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const SwiperShowProduct = ({ children }) => {
  return (

    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      navigation={true}
      breakpoints={{
        100: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      }}

      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay, Navigation]}
      className="mySwiper  object-cover rounded-lg"
    >

      {children}
    </Swiper>

  )
}

export default SwiperShowProduct