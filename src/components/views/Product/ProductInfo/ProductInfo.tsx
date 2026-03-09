import StarUi from "@/components/ui/StarUi";
import { syaratLoginContext } from "@/context/syaratLoginContext";
import { IProduct } from "@/types/product"
import convert from "@/utils/convert"
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react"
import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/cart";
import useProductInfo from "./useProductInfo";
import Script from "next/script";
import { environment } from "@/utils/environment";
import { cn } from "@/utils/cn";

interface TypeProps {
  data: IProduct;
}

const ProductInfo = (props: TypeProps) => {
    const {
      data
    } = props;

    const {
      onCreateOrder,
      isPendingCreateOrder
    } = useProductInfo();


    const {
      handleAddToCart,
      isSuccessAddtoCart,
      isPendingAddToCart,
      refetchCarts,
    } = useCart()


    const {setSyaratLogin} = useContext(syaratLoginContext);

    const session = useSession();

    const handleBuy = (data: {productId: string; name: string; price: number; quantity: number}) => {
      if(session.status === "authenticated") {
        const payload = {
          products: [
            data
          ]
        }

        onCreateOrder(payload);
        return;
      }

      setSyaratLogin({
        isOpen: true,
        type: "pembelian"
      })
    }

    const onAddToCart = (id:string) => {
      if(session.status === "authenticated") {
        handleAddToCart(id);
        return;
      }

      setSyaratLogin({
        isOpen: true,
        type: "penambahann keranjang"
      })
    }

    useEffect(() => {
      if(isSuccessAddtoCart) {
        refetchCarts();
      }
    }, [isSuccessAddtoCart])


    return (
          <>
            <Script 
              src={environment.MIDTRANS_SNAP_URL} 
              data-client-key={environment.MIDTRANS_CLIENT_KEY}
              strategy="lazyOnload"
            />
          
            <Card className="p-4">
              <CardHeader className="text-2xl text-default-700 font-bold">
                {data?.name}
              </CardHeader>
              <CardBody>
                <p className="text-default-400">
                  {`${data.quantity}`} in stock
                </p>

                <div className="my-4">
                  <StarUi dataStar={data?.starsAgr as number} comment={data?.totalComment} />  
                </div>

                <div className="flex gap-2">
                  <h3 className={cn("font-bold text-xl text-default-700", {"text-default-400 line-through": data?.discount && data?.discount as number > 0})}>
                    {convert.IDR(Number(data?.price))}
                  </h3>
                  <span className={cn("text-default-700 font-bold", {"hidden" : !data?.discount})}>
                    -
                  </span>
                  <h3 className={cn("text-default-700 font-bold text-xl", {"hidden" : !data?.discount})}>
                    {convert.IDR(Number(Number(data?.price) - (Number(data?.price) * Number(data?.discount) / 100)))}
                  </h3>
                  <span className={cn("text-default-400", {"hidden" : !data?.discount})}>
                    sale {data?.discount}%
                  </span>
                </div>

                <div className="flex gap-4 my-4">
                  <Button color="primary" variant="solid" onPress={() => handleBuy({productId: `${data._id}`, name: `${data.name}`, price: Number(data.price), quantity: 1})} isDisabled={isPendingCreateOrder || isPendingCreateOrder}>
                    {isPendingCreateOrder ? <Spinner color="default" size="sm" /> : "Buy Now"}
                  </Button>
                  <Button color="primary" variant="flat" onPress={() => onAddToCart(`${data?._id}`)} isDisabled={isPendingAddToCart || isPendingCreateOrder}>
                    {isPendingAddToCart ? <Spinner color="primary" size="sm" /> : "Add to Cart"}
                  </Button>
                </div>

              </CardBody>
            </Card>               
          </>
        
        
    )
}


export default ProductInfo;