import { IProduct } from '@/types/product';
import convert from '@/utils/convert';
import {Card, CardBody, Pagination, Skeleton} from '@heroui/react'
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import useTabAnak from './useTabAnak';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ICategory } from '@/types/category';
import StarUi from '@/components/ui/StarUi';
import CardProduct from '@/components/ui/CardProduct';


interface TypeProps {
  category: ICategory
}

const TabAnak = (props: TypeProps) => {
    const {
      category
    } = props;


    const {
      dataProductsByAnakByCategory,
      isLoadingProductsByAnakByCategory,
      setUrl,
      currentPage,
      handlePage
    } = useTabAnak()

    const router = useRouter();
    useEffect(() => {
      if(!router.isReady) return;
      if(!router.query.id) return;
      setUrl();
    }, [router.isReady])



    return (
      <Card className="rounded-none shadow-none min-h-screen">
        <CardBody className='gap-4'>
          <div>
            <p className='text-default-400 text-sm'>
              Show 1 - 20 from {dataProductsByAnakByCategory?.data?.length} products
            </p>
            
          </div>
          <div className='min-h-fit h-24 grid grid-cols-2 lg:grid-cols-3 gap-4'>
              {router.isReady && !isLoadingProductsByAnakByCategory ? 
                dataProductsByAnakByCategory?.data?.length < 1 ? (
                  <div>
                    <h1 className='text-xl text-default-400'>
                      This Products is empty
                    </h1>
                  </div>
                ) : (
                dataProductsByAnakByCategory?.data?.map((p: IProduct) => (
                  <div key={p._id} className="cursor-pointer">
                    <CardProduct data={p} label={`${category?.name} - kid`} />
                  </div>
                ))
              ) : (
                Array.from({
                  length: dataProductsByAnakByCategory?.data?.length || 6
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
        </CardBody>
        <CardBody className='items-center'>
          <Skeleton className='rounded-2xl' isLoaded={router.isReady && !isLoadingProductsByAnakByCategory}>
            {dataProductsByAnakByCategory && dataProductsByAnakByCategory?.data?.length > 0 && (
              <Pagination showControls initialPage={Number(currentPage)} total={dataProductsByAnakByCategory?.data?.length} onChange={handlePage} />
            )}
          </Skeleton>
        </CardBody>
      </Card>
      
    )
}

export default TabAnak;