import { Button } from "@heroui/react";
import Link from "next/link";



const Hero2 = () => {
    return (
        <div className="bg-[url(/images/img/hero/freestocks-_3Q3tsJ01nc-unsplash.jpg)] bg-cover bg-center h-[50vw]">
          {/* <div className="bg-black/20 h-full"> */}
            <div className="mx-4 lg:mx-auto h-full lg:max-w-5xl">
              {/* <div className="flex items-center h-full">
                <div className="flex flex-col gap-1 lg:gap-2">
                  <p className="text-lg text-default-100 font-light">
                    Designed for Everyday Movement
                  </p>
                  <h1 className="font-bold text-3xl lg:text-4xl text-default-800">
                    Tas Stylish untuk Aktivitas Tanpa Batas
                  </h1>
                  <Button as={Link} href="/sale-product" className="w-fit text-default-800" >
                    Shop Sale
                  </Button>
                </div>
              </div> */}
            </div>
          {/* </div> */}
        </div>
    )
}

export default Hero2;