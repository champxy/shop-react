import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const ContentCarousel = () => {
    const [data, setData] = useState([]);

    const handelgetimage = () => {
        axios.get('https://picsum.photos/v2/list?page=1&limit=15')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        handelgetimage();
    }, []);

    return (
        <div >
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
                {data?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.download_url} alt="image" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                navigation={true}
                breakpoints={{
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
                {data?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.download_url} alt="image" className="rounded-lg" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ContentCarousel;
