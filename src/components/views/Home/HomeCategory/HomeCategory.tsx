import { ICategory } from "@/types/category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { Image } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface TypeProps {
  data: ICategory[],
  isLoading: boolean
}

const HomeCategory = (props: TypeProps) => {
    const {
      data,
      isLoading
    } = props;

    const router = useRouter();

    return (
      <section className="mx-4 lg:mx-8 my-4 py-4">
        <Card className="py-4 px-4 shadow-none">
          <CardHeader className="justify-between">
            <h3 className="text-primary font-semibold">
              Category
            </h3>
            <Link href="" className="text-default-500 font-semibold hover:underline text-sm lg:text-base ">
              Selengkapnya
            </Link>
          </CardHeader>
          <CardBody>
            <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-8">
              {router.isReady && !isLoading && !!data && Array.isArray(data) ? data?.map((c: ICategory) => (
                <Link key={`${c._id}`} href={`/products/category/${c._id}`} className="bg-gray-500 p-1 rounded-xl flex items-center justify-center active:scale-70 transition duration-200">
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