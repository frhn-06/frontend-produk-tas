import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Skeleton } from "@heroui/react";
import {Image} from '@heroui/react'
import { Autoplay, Pagination } from 'swiper/modules';

interface TypeProps {
  dataBanners: Record<string, unknown>[],
  isLoading: boolean;
}

const HeroSlider = (props: TypeProps) => {
    const {
      dataBanners,
      isLoading
    } = props;

    return (
      <div className="mx-2 my-6">
        {!isLoading ? (
          <div className=" w-full">
            <Swiper spaceBetween={30} modules={[Autoplay, Pagination]} autoplay={{delay: 4000, disableOnInteraction: false}} pagination={{dynamicBullets: true, clickable: true}} loop className='h-full w-full'>
              {dataBanners?.map((d) => (
                <SwiperSlide key={`${d._id}`} className='h-full'>
                  <Image src={`${d.image}`} className='w-full h-full rounded-none object-center' width={1540} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <Skeleton className='h-[12vw]'>
          </Skeleton>
        )}
      </div>
    )
}

export default HeroSlider;