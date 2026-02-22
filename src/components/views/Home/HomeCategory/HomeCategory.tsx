import { ICategory } from "@/types/category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { Image } from "@heroui/react";
import Link from "next/link";

interface TypeProps {
  data: ICategory[],
  isLoading: boolean
}

const HomeCategory = (props: TypeProps) => {
    const {
      data,
      isLoading
    } = props;

    return (
      <section className="mx-4 lg:mx-8 my-4 py-4">
        <Card className="py-4 px-4 shadow-none">
          <CardHeader className="justify-end">
            <Link href="" className="text-default-500 font-semibold hover:underline ">
              Selengkapnya
            </Link>
          </CardHeader>
          <CardBody>
            <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-8">
              {!isLoading ? data.map((c: ICategory) => (
                <Link key={`${c._id}`} href={`/product?category=${c._id}`} className="bg-gray-500 p-1 rounded-xl flex items-center justify-center">
                  <Image src={`${c.icon}`} className="aspect-square " />
                </Link>                
              )) : (
                Array.from({length: 8}).map((_, i) => (
                  <Skeleton key={`${i}`} className="aspect-square rounded-2xl">

                  </Skeleton>
                ))
              )}  
            </div>
          </CardBody>
        </Card>
      </section>
    )
} 

export default HomeCategory;