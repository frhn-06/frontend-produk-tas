import CardProduct from "@/components/ui/CardProduct";
import StarUi from "@/components/ui/StarUi";
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
            <h1 className="font-bold text-lg lg:text-xl text-primary">
              New Product
            </h1>
            <Link href="/products" className="text-default-500 font-semibold text-sm lg:text-base hover:underline ">
              Selengkapnya
            </Link>
          </div>
          <div className="py-4 overflow-x-auto">
            <div className="grid auto-cols-[16rem] lg:grid-cols-4 grid-flow-col gap-4">
              {!isLoading ? data?.map((p) => (
                <div key={`${p._id}`} className="cursor-pointer">
                  <CardProduct data={p} label="NEW" />
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