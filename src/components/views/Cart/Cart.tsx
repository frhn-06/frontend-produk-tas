import PlusMinusAngka from "@/components/ui/PlusMinusAngka";
import { BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton, Spinner } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import useCartPage from "./useCartPage";
import {Image} from '@heroui/react'
import { ICart } from "@/types/cart";
import convert from "@/utils/convert";
import { useSession } from "next-auth/react";
import Script from "next/script";
import { environment } from "@/utils/environment";
import { CiMenuKebab } from "react-icons/ci";
import useCart from "@/hooks/cart";
import Link from "next/link";

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
      isSuccessMinCart,

      onDeleteOneCart,
      isPendingDeleteOneCart,
      isSuccessDeleteOneCart,

      onDeleteAllCart,
      isPendingDeleteAllCart,
      isSuccessDeleteAllCart,

      onCreateOrder,
      isPendingCreateOrder,

      isPendingDeleteAll,
      isSuccessDeleteAll
    } = useCartPage();

    const {
      refetchCarts
    } = useCart();

    const [angka, setAngka] = useState(1);

    const session = useSession();

    useEffect(() => {
      if(isSuccessDeleteAllCart || isSuccessDeleteOneCart) {
        refetchCarts();
      }
    },[isSuccessDeleteAllCart, isSuccessDeleteOneCart])


    useEffect(() => {
      if(isSuccessPlusCart || isSuccessMinCart || isSuccessDeleteAll || isSuccessDeleteOneCart || isSuccessDeleteAllCart) refetchDataCart();
    },[isSuccessPlusCart, isSuccessMinCart, isSuccessDeleteAll, isSuccessDeleteOneCart, isSuccessDeleteAllCart])


    const totalPrice = () => {
      if(dataCarts) {
        return dataCarts?.data?.reduce((c: number, r: ICart) => {
          return c + Number(r.productId?.price) * Number(r.quantity);
        },0)
      }
    }

    const handleOrder = (data: ICart[]) => {
      const arr = data.map(d => {
        return {
          productId: d.productId?._id, 
          name: d.productId?.name,
          price: Number(d.productId?.price),
          quantity: Number(d.quantity)
        }
      });

      const payload = {
        products: arr
      };

      onCreateOrder(payload);
    }

    const handleOrderOne = (data: {productId: string; name: string; price: number; quantity: number;} ) => {
      const payload = {
        products: [
          data
        ]
      }

      onCreateOrder(payload);
    }

    const columnCarts = useMemo(() => {
      return (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-4">
            {session.status === "authenticated" ? (
              <Skeleton className="flex-4 rounded-2xl" isLoaded={ !isLoadingCarts || isPendingDeleteAll}>
                <div className="flex-4 flex flex-col gap-4">
                  {dataCarts?.data?.length > 0 && (
                    <div>
                      <Button color="primary" variant="flat" onPress={() => onDeleteAllCart()} isDisabled={isPendingDeleteAllCart || isPendingDeleteOneCart}>
                        {isPendingDeleteAllCart ? <Spinner color="primary" size="sm" /> : "Clear All"}
                      </Button>
                    </div>
                  )}

                  {dataCarts?.data?.map((c: ICart) => (
                    <div key={c?._id} className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="aspect-square w-21 ">
                        <Image src={`${c?.productId?.image}`} />
                      </div>
                      <div className="flex justify-start items-center flex-1 gap-2">
                        <div className="flex-2">
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
                        <div className="flex-1">
                          <Dropdown>
                            <DropdownTrigger>
                              <CiMenuKebab />
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem key="buy" onPress={() => handleOrderOne({productId: `${c.productId?._id}`, name:`${c.productId?.name}`, price: Number(c.productId?.price), quantity: Number(c.quantity)}) }>
                                Buy
                              </DropdownItem>
                              <DropdownItem key="delete" onPress={() => onDeleteOneCart(`${c._id}`)}>
                                {isPendingDeleteOneCart ? <Spinner color="primary" size="sm" /> : "Delete"}
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>                  
                      </div>
                    </div> 
                  ))}
                </div>
              </Skeleton>
            ) : (
              <div className="flex-4 flex justify-center items-center">
                <h1 className="text-xl text-default-400">
                  Cart is empty
                </h1>
              </div>
            )}
            {session.status === "authenticated" ? (
              <Skeleton className="flex-2 rounded-2xl" isLoaded={!!dataCarts}>
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
                      <Button type="button" color="primary" fullWidth disabled={!dataCarts || dataCarts.data.length === 0 || session.status !== "authenticated"} onPress={() => handleOrder(dataCarts?.data)} isDisabled={isPendingCreateOrder || isPendingDeleteAll || isPendingMinCart || isPendingPlusCart || isPendingDeleteOneCart} >
                        {isPendingCreateOrder ? <Spinner color="default" size="sm" /> : "Check Out All"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Skeleton>
            ) : (
              <div className="flex-2 flex justify-center items-center">
                <Link href="/auth/login" className="text-primary underline">
                  please login first for add to cart
                </Link>
              </div>
            )}
            
          </div>
      )
    }, [dataCarts, handlePlusCart, isRefetchingDataCarts, isLoadingCarts, isPendingPlusCart, handleMinCart, totalPrice])

    return (
        <>
          <Script src={environment.MIDTRANS_SNAP_URL} data-client-key={environment.MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
            

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
        </>
    )
}

export default Cart;