import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


interface TypeProps {
  dataBanners: Record<string, unknown>[],
  isLoading: boolean;
}

const ProductSlider = (props: TypeProps) => {
    const {
      dataBanners,
      isLoading
    } = props;

    return (
      // <div className="mx-2 my-6 bg-amber-400">
      //   {!isLoading ? (
      //     <div className=" w-full">
      //       <Swiper spaceBetween={30} modules={[Autoplay, Pagination]} autoplay={{delay: 4000, disableOnInteraction: false}} pagination={{dynamicBullets: true, clickable: true}} loop>
      //         {dataBanners?.map((d) => (
      //           <SwiperSlide key={`${d._id}`} className='h-full'>
      //             <Image src={`${d.image}`} className='w-full h-full rounded-none object-center' />
      //           </SwiperSlide>
      //         ))}
      //       </Swiper>
      //     </div>
      //   ) : (
      //     <Skeleton className='h-[12vw]'>
      //     </Skeleton>
      //   )}
      // </div>

      <div className='w-full overflow-x-hidden relative bg-amber-300'>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}

        >
          { dataBanners?.map(b => (
            <SwiperSlide key={`${b._id}`}>
              <img src={`${b.image}`} alt="banner" className='w-30' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
}

export default ProductSlider;