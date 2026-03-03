import { IProduct } from '@/types/product';
import convert from '@/utils/convert';
import {Card, CardBody, Pagination, Skeleton} from '@heroui/react'
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import useTabWanita from './useTabWanita';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import StarUi from '@/components/ui/StarUi';
import CardProduct from '@/components/ui/CardProduct';




const TabWanita = () => {

    const {
      dataProductsByWanita,
      isLoadingProductsByWanita,
      setUrl,
      currentPage,
      handlePage
    } = useTabWanita()

    const router = useRouter();
    useEffect(() => {
      setUrl();
    }, [router.isReady])



    return (
      <Card className="rounded-none shadow-none min-h-screen">
        <CardBody className='gap-4'>
          <div>
            <p className='text-default-400 text-sm'>
              Show 1 - 20 from {dataProductsByWanita?.data?.length} products
            </p>
            
          </div>
          <div className='min-h-fit h-24 grid grid-cols-2 lg:grid-cols-3 gap-4'>
              {router.isReady && !isLoadingProductsByWanita ? 
                dataProductsByWanita?.data?.length < 1 ? (
                  <div>
                    <h1 className='text-xl text-default-400'>
                      This Products is empty
                    </h1>
                  </div>
                ) : (
                dataProductsByWanita?.data?.map((p: IProduct) => (
                  <div key={p._id} className="cursor-pointer">
                    <CardProduct data={p} label="NEW - women" />
                  </div>
                ))
              ) : (
                Array.from({
                  length: dataProductsByWanita?.data?.length || 6
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
          <Skeleton className='rounded-2xl' isLoaded={router.isReady && !isLoadingProductsByWanita}>
            {dataProductsByWanita && dataProductsByWanita?.data?.length > 0 && (
              <Pagination showControls initialPage={Number(currentPage)} total={dataProductsByWanita?.data?.length} onChange={handlePage} />
            )}
          </Skeleton>
        </CardBody>
      </Card>
      
    )
}

export default TabWanita;