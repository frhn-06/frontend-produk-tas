import PlusMinusAngka from "@/components/ui/PlusMinusAngka";
import { BreadcrumbItem, Breadcrumbs, Button, Spinner } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import useCart from "./useCart";
import {Image} from '@heroui/react'
import { ICart } from "@/types/cart";
import convert from "@/utils/convert";

const Cart = () => {

    const {
      dataCarts,
      isLoadingCarts,
      refetchDataCart,
      isRefetchingDataCarts,
      
      handlePlusCart,
      isPendingPlusCart,
      isSuccessPlusCart,

      handleMinCart,
      isPendingMinCart,
      isSuccessMinCart
    } = useCart();

    const [angka, setAngka] = useState(1);


    useEffect(() => {
      if(isSuccessPlusCart || isSuccessMinCart) refetchDataCart();
    },[isSuccessPlusCart, isSuccessMinCart])


    const totalPrice = () => {
      if(dataCarts) {
        return dataCarts?.data?.reduce((c: number, r: ICart) => {
          return c + Number(r.productId?.price) * Number(r.quantity);
        },0)
      }
    }

    const columnCarts = useMemo(() => {
      return (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
            <div className="flex-4 flex flex-col gap-4">
              {dataCarts?.data?.map((c: ICart) => (
                <div key={c?._id} className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="aspect-square w-21 ">
                    <Image src={`${c?.productId?.image}`} />
                  </div>
                  <div className="flex justify-start items-center flex-1 gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm">
                        {c?.productId?.name}
                      </h4>
                    </div>
                    <div className="flex-1">
                      <div className="w-fit">
                        <PlusMinusAngka data={c} angka={c?.quantity || 0} setAngka={setAngka} size="sm" onPlus={handlePlusCart} onMin={handleMinCart} />
                      </div>
                    </div> 
                    <div className="flex-1">
                      <p className="text-sm">
                        {convert.IDR(Number(c?.productId?.price as number * (c?.quantity || 0)))}
                      </p>
                    </div>                   
                  </div>
                </div> 
              ))}
            </div>
            <div className="flex-2">
              <div className="bg-default-200 w-full rounded-2xl p-4 flex flex-col gap-8">
                <h1 className="font-bold text-2xl text-default-700">
                  Order Summary
                </h1>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-default-700">
                      total
                    </p>
                    <p className="font-bold text-sm text-default-700">
                      {dataCarts ? `${convert.IDR(totalPrice())}` : "0"}
                    </p>
                  </div>
                  <Button type="button" color="primary" fullWidth>
                    Check Out All
                  </Button>
                </div>
              </div>
            </div>
            
          </div>
      )
    }, [dataCarts, handlePlusCart, isRefetchingDataCarts, isLoadingCarts, isPendingPlusCart, handleMinCart, totalPrice])

    return (
        <section className="bg-white min-h-screen max-w-7xl mx-auto py-6">
          <div className="p-4 flex flex-col gap-4">
            <div className="p-4" >
              <Breadcrumbs color="secondary" variant="bordered" underline="active">
                <BreadcrumbItem href="/"><b className="text-default-700">Home</b></BreadcrumbItem>
                <BreadcrumbItem href="/products"><b className="text-default-700">/cart</b></BreadcrumbItem>
              </Breadcrumbs>
            </div>

            <div>
              <h1 className="font-bold text-2xl text-default-700 mb-4">
                My Cart
              </h1>
              
              <div>
                {columnCarts}
              </div>
            </div>

          </div>
        </section>
    )
}

export default Cart;