import { IProduct } from "@/types/product";
import convert from "@/utils/convert";
import {  cn, Skeleton } from "@heroui/react";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

interface TypeProps {
  data: IProduct[],
  isLoading: boolean;
}

const HomeProductFeatured = (props: TypeProps) => {
    const {
      data,
      isLoading
    } = props;

    return (
        <section className="mx-4 lg:mx-8 my-4 py-4">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl lg:text-2xl text-primary">
              Last Product
            </h1>
            <Link href="" className="text-default-500 font-semibold hover:underline ">
              Selengkapnya
            </Link>
          </div>
          <div className="py-4 overflow-x-auto">
            <div className="grid auto-cols-[16rem] lg:grid-cols-4 grid-flow-col gap-4">
              {!isLoading ? data?.map((p) => (
                <div key={`${p._id}`} className="cursor-pointer">
                  <div className="flex flex-col gap-4">
                    <div className="aspect-square flex items-center overflow-hidden relative">
                      <Link href={`/product/${p.slug}`}>                      
                        <img src={`${p.image}`} alt="foto" className="w-full object-cover object-center" />
                      </Link>
                      <div className="bg-default-900 absolute top-0 left-0 px-1">
                        <span className="text-default-100 text-sm font-500">
                          NEW
                        </span>
                      </div>
                    </div>
                    <div>
                      <h1 className=" lg:text-lg text-default-700">
                        {p.name}
                      </h1>
                      <p className="font-bold text-sm">
                        {convert.IDR(Number(p.price))}
                      </p>
                      <div className="flex gap-2 items-center text-default-700">
                        {p.totalComment !== 0 ? (
                          <IoStar className="" /> 
                        ) : (
                          <FaRegStar />
                        )}
                      </div>
                      <p className="text-sm text-default-500">
                        ({p.totalComment} review)
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                Array.from({length: 4}).map((_,i) => (
                  <div key={i}>
                    <div className="flex flex-col gap-4">
                      <Skeleton className="aspect-square" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-12" />

                        <Skeleton className="h-8" />
                      </div>
                    </div>
                  </div>
                ))
              )}
              
            </div>
          </div>

        </section>
    )
}

export default HomeProductFeatured;