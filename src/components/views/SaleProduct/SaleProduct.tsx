import { useEffect } from "react";
import useSaleProduct from "./useSaleProduct";
import { useRouter } from "next/router";
import { IProduct } from "@/types/product";
import CardProduct from "@/components/ui/CardProduct";
import { Pagination, Skeleton } from "@heroui/react";

const SaleProduct = () => {
    const {
      url,
      currentPage,
      handlePage,

      dataSaleProducts,
      isLoadingSaleProducts
    } = useSaleProduct();

    const router = useRouter();

    useEffect(() => {
      url();
    }, [router.isReady])

    return (
        <>
          <div className="flex justify-between mb-8">
            <h1 className="font-bold text-4xl text-default-700">
              Sale Products
            </h1>
          </div>

          <div>
            <p className='text-default-400 text-sm'>
              Show 1 - 20 from {dataSaleProducts?.data?.length} sale products
            </p>
          </div>

          <div className='min-h-fit h-24 grid grid-cols-2 lg:grid-cols-3 gap-4 my-6'>
            {router.isReady && !isLoadingSaleProducts ? 
              dataSaleProducts?.data?.length < 1 ? (
                <div>
                  <h1 className='text-xl text-default-400'>
                    This Products is empty
                  </h1>
                </div>
              ) : (
              dataSaleProducts?.data?.map((p: IProduct) => (
                <div key={p._id} className="cursor-pointer">
                  <CardProduct data={p} label={`SALE ${p?.discount}%`} isDiscount />
                </div>
              ))
            ) : (
              Array.from({
                length: dataSaleProducts?.data?.length || 6
              }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="aspect-square" />
                  <Skeleton className="min-h-8" />
                  <Skeleton className="w-3/4 min-h-4" />
                  <Skeleton className="w-3/4 min-h-4" />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center items-center">
            <Skeleton className='rounded-2xl' isLoaded={router.isReady && !isLoadingSaleProducts}>
              {dataSaleProducts && dataSaleProducts?.data?.length > 0 && (
                <Pagination showControls initialPage={Number(currentPage)} total={dataSaleProducts?.data?.pagination?.totalPage} onChange={handlePage} />
              )}
            </Skeleton>
          </div>
        </>
    )
}

export default SaleProduct;