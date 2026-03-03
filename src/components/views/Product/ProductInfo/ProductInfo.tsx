import StarUi from "@/components/ui/StarUi";
import { syaratLoginContext } from "@/context/syaratLoginContext";
import { IProduct } from "@/types/product"
import convert from "@/utils/convert"
import { Button, Card, CardBody, CardHeader } from "@heroui/react"
import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/cart";

interface TypeProps {
  data: IProduct;
}

const ProductInfo = (props: TypeProps) => {
    const {
      data
    } = props;

    const {
      handleAddToCart,
      isSuccessAddtoCart,
      refetchCarts
    } = useCart()


    const {setSyaratLogin} = useContext(syaratLoginContext);

    const session = useSession();

    const handleBuy = () => {
      if(session.status === "authenticated") {
        console.log("asu");
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

              {data?.discount && 
              data?.discount as number > 0 ? (
                <div className="flex gap-2">
                  <h3 className="line-through font-bold text-xl text-default-500">
                    {convert.IDR(Number(data?.price))}
                  </h3>
                  <h3 className="line-through font-bold text-xl text-default-500">
                    {convert.IDR(Number(Number(data?.price) - ((data?.price as number * 100) / Number(data?.discount))))}
                  </h3>
                  <span className="text-default-400 text-sm">
                    Sale {data?.discount}%
                  </span>
                </div>
              ) : (
                <h3 className="font-bold text-xl text-default-700">
                  {convert.IDR(Number(data?.price))}
                </h3>
              )}

              <div className="flex gap-4 my-4">
                <Button color="primary" variant="solid" onPress={() => handleBuy()}>
                  Buy Now
                </Button>
                <Button color="primary" variant="flat" onPress={() => onAddToCart(`${data?._id}`)}>
                  Add to Cart
                </Button>
              </div>

            </CardBody>
          </Card>               
        
    )
}


export default ProductInfo;