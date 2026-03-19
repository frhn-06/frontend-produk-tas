import { Image, Link } from "@heroui/react"
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"

const FooterLayout = () => {
    return (
      <div className="bg-[#0c2c41] flex flex-col gap-4 pt-4 px-4 lg:px-8">
        <div className="">
          <div className="py-4 flex flex-col lg:flex-row gap-4 justify-between w-full items-center">
            <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-start w-2/3">
              <Image src={"/images/svg/logo/logo-velaro.svg"} className="w-full" />
            </div>

            <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-start">
              <div>
                <h1 className="text-default-100 text-md lg:text-lg font-semibold">
                  Services
                </h1>
                <p className="text-default-400 text-sm lg:text-base ">
                  velarofficial@gmail.com
                </p>
              </div>
              <div>
                <h1 className="text-default-100 text-md lg:text-lg font-semibold">
                  Office
                </h1>
                <p className="text-default-400 text-sm lg:text-base">
                  Jl. Jendral Sudirman Pemalang 52353 <Link href="" className="font-semibold hover:underline cursor-pointer">Lihat map</Link>
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-start">
              <div>
                <h1 className="text-default-100 text-md lg:text-lg font-semibold">
                  Menu
                </h1>
                <p className="text-default-400 text-sm lg:text-base cursor-pointer">
                  <Link>
                    Home
                  </Link>
                </p>
                <p className="text-default-400 text-sm lg:text-base cursor-pointer">
                  <Link>
                    About
                  </Link>
                </p>
                <p className="text-default-400 text-sm lg:text-base cursor-pointer">
                  <Link>
                    Product
                  </Link>
                </p>
              </div>
              
            </div>
            
          

            <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-start">
              <div className="flex gap-8 justify-center">
                <Link>
                  <FaInstagram className="text-default-400 text-sm lg:text-base w-8 h-8 cursor-pointer"/>
                </Link>
                <Link>
                  <FaTiktok className="text-default-400 text-sm lg:text-base w-8 h-8 cursor-pointer"/>
                </Link>
                <Link>
                  <FaFacebook className="text-default-400 text-sm lg:text-base w-8 h-8 cursor-pointer"/>
                </Link>
                
              </div>

            </div>
          </div>
          <div className="border-t-1 border-t-default-500 flex items-center justify-center p-4">
            <p className="text-default-500 text-sm text-center">
              &copy; Copyright 2026 | Velaro bags and wallets Official 
            </p>
          </div>
        </div>
      </div>
    )
} 

export default FooterLayout