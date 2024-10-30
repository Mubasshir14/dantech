
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img from '../../assets/banner1.jpg'
import img1 from '../../assets/banner2.jpg'
import img2 from '../../assets/banner3.png'
import img3 from '../../assets/banner.jpg'
import img4 from '../../assets/banner4.jpg'

const Banner = () => {
    return (
        <div className=''>
            <Swiper
        slidesPerView={1}
        autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={img} alt="" className='h-[40vh] md:h-[600px] w-full'/>
        </SwiperSlide>
        {/* <SwiperSlide>
            <img src={img1} alt="" className='h-[40vh] md:h-[600px] w-full'/>
        </SwiperSlide> */}
        <SwiperSlide>
            <img src={img2} alt="" className='h-[40vh] md:h-[600px] w-full'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img3} alt="" className='h-[40vh] md:h-[600px] w-full'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img4} alt="" className='h-[40vh] md:h-[600px] w-full'/>
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Banner;