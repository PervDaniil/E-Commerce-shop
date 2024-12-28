import React from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function SwiperComponent({ children, props }) {
    return (
        <Swiper {...props} slidesPerView={4}>
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index} >
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}