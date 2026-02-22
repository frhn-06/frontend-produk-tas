import { touchGenderContext } from '@/context/touchGenderContext';
import { cn } from '@/utils/cn';
import { Image} from '@heroui/react'
import { useContext, useState } from 'react';

const HomeGender = () => {

    const defaultHover = {pria: false, wanita: false, anak: false}

    const [hover, setHover] = useState(defaultHover);

    const {touchGender, setTouchGender} = useContext(touchGenderContext);

    const defaultTouchGender = {
      pria: false,
      wanita: false, 
      anak: false
    }
    
    return (
        <section className="mx-4 lg:mx-8 my-4 py-4">
          <div className="max-w-2xl lg:max-w-screen flex flex-col gap-4 lg:flex-row">
            <div className='relative overflow-hidden rounded-2xl cursor-pointer' onMouseEnter={() => setHover({...defaultHover, pria: true})} onMouseLeave={() => setHover(defaultHover)} onTouchStart={() => setTouchGender({...defaultTouchGender, pria: true})}>
              <div className={cn("absolute w-full h-full z-12 flex justify-center items-center -translate-y-full transition duration-200 delay-150", {"translate-y-0": hover.pria || touchGender.pria})}>
                <h3 className='font-bold text-default-100 text-4xl'>
                  PRIA
                </h3>
              </div>
              <div className={cn("absolute w-full h-full bg-black/30 z-11 rounded-2xl translate-y-full group-hover:translate-y-0 transition duration-200", {"translate-y-0": hover.pria || touchGender.pria})}>

              </div>
              <Image src={'/images/img/gender/ChatGPT Image 22 Feb 2026, 15.02.02.png'} className='w-full' />
            </div>
            <div className='relative overflow-hidden rounded-2xl cursor-pointer' onMouseEnter={() => setHover({...defaultHover, wanita: true})} onMouseLeave={() => setHover(defaultHover)} onTouchStart={() => setTouchGender({...defaultTouchGender, wanita: true})}>
              <div className={cn("absolute w-full h-full z-12 flex justify-center items-center -translate-y-full transition duration-200 delay-150", {"translate-y-0": hover.wanita || touchGender.wanita})}>
                <h3 className='font-bold text-default-100 text-4xl'>
                  WANITA
                </h3>
              </div>
              <div className={cn("absolute w-full h-full bg-black/30 z-11 rounded-2xl translate-y-full group-hover:translate-y-0 transition duration-200", {"translate-y-0": hover.wanita || touchGender.wanita})}>

              </div>
              <Image src={'/images/img/gender/ChatGPT Image 22 Feb 2026, 15.04.43.png'} className='w-full' />
            </div>
            <div className='relative overflow-hidden rounded-2xl cursor-pointer' onMouseEnter={() => setHover({...defaultHover, anak: true})} onMouseLeave={() => setHover(defaultHover)} onTouchStart={() => setTouchGender({...defaultTouchGender, anak: true})}>
              <div className={cn("absolute w-full h-full z-12 flex justify-center items-center -translate-y-full transition duration-200 delay-150", {"translate-y-0": hover.anak || touchGender.anak})}>
                <h3 className='font-bold text-default-100 text-4xl'>
                  ANAK
                </h3>
              </div>
              <div className={cn("absolute w-full h-full bg-black/30 z-11 rounded-2xl translate-y-full group-hover:translate-y-0 transition duration-200", {"translate-y-0": hover.anak || touchGender.anak})}>

              </div>
              <Image src={'/images/img/gender/ChatGPT Image 22 Feb 2026, 15.08.10.png'} className='w-full' />
            </div>
          </div>
        </section>
    )
}

export default HomeGender;