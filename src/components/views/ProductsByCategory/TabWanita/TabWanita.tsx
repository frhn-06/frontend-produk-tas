import { IProduct } from '@/types/product';
import convert from '@/utils/convert';
import {Card, CardBody, Pagination, Skeleton} from '@heroui/react'
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import useTabWanita from './useTabWanita';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ICategory } from '@/types/category';
import StarUi from '@/components/ui/StarUi';
import CardProduct from '@/components/ui/CardProduct';

interface TypeProps {
  category: ICategory
}


const TabWanita = (props: TypeProps) => {
    const {
      category
    } = props;


    const {
      dataProductsByWanitaByCategory,
      isLoadingProductsByWanitaByCategory,
      setUrl,
      currentPage,
      handlePage
    } = useTabWanita()

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
              Show 1 - 20 from {dataProductsByWanitaByCategory?.data?.length} products
            </p>
            
          </div>
          <div className='min-h-fit h-24 grid grid-cols-2 lg:grid-cols-3 gap-4'>
              {router.isReady && !isLoadingProductsByWanitaByCategory ? 
                dataProductsByWanitaByCategory?.data?.length < 1 ? (
                  <div>
                    <h1 className='text-xl text-default-400'>
                      This Products is empty
                    </h1>
                  </div>
                ) : (
                dataProductsByWanitaByCategory?.data?.map((p: IProduct) => (
                  <div key={p._id} className="cursor-pointer">
                    <CardProduct data={p} label={`${category?.name} - women`} />
                  </div>
                ))
              ) : (
                Array.from({
                  length: dataProductsByWanitaByCategory?.data?.length || 6
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
          <Skeleton className='rounded-2xl' isLoaded={router.isReady && !isLoadingProductsByWanitaByCategory}>
            {dataProductsByWanitaByCategory && dataProductsByWanitaByCategory?.data?.length > 0 && (
              <Pagination showControls initialPage={Number(currentPage)} total={dataProductsByWanitaByCategory?.data?.length} onChange={handlePage} />
            )}
          </Skeleton>
        </CardBody>
      </Card>
      
    )
}

export default TabWanita;