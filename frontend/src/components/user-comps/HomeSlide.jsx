import React, { useEffect, useRef } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Button } from '../ui/button';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';


const HomeSlide = ({ slides, break640=1, break768=1, break1024=1, children, slidesPerView, setDetailsId, setOpenDetails }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
    
    useEffect(()=>{
        console.log(slides);
    }, [])
    return (
        <section className={` w-full ${children === "img" ? 'h-[500px]' : ''} flex overflow-hidden relative`}>
            <Button ref={prevRef} variant="outline" size="icon" className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
                <FaAngleLeft className='text-lg' />
            </Button>
            <Button ref={nextRef} variant="outline" size="icon" className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
                <FaAngleRight className='text-lg' />
            </Button>


            <Swiper
                spaceBetween={10}
                slidesPerView={slidesPerView}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full w-full"
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                // breakpoints= {{
                //     640: {
                //         slidesPerView: break640,
                //     },
                //     768: {
                //         slidesPerView: break768,
                //     },
                //     1024: {
                //         slidesPerView: break1024,
                //     }
                //  }}
            >
                {slides?.map((item, index) => (
                    <SwiperSlide key={index} className='h-full w-full cursor-pointer'>
                        {children === "img" ? (
                            <img src={item} alt="" className='w-full h-full object-cover' />
                        ):(
                            <ProductCard product={item} setDetailsId={setDetailsId} setOpenDetails={setOpenDetails} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>

    )
}

export default HomeSlide