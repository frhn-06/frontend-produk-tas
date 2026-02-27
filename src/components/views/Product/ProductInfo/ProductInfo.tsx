import StarUi from "@/components/ui/StarUi";
import { IProduct } from "@/types/product"
import convert from "@/utils/convert"
import { Button, Card, CardBody, CardHeader } from "@heroui/react"

interface TypeProps {
  data: IProduct;
}

const ProductInfo = (props: TypeProps) => {
    const {
      data
    } = props;

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
                <Button color="primary" variant="solid">
                  Buy Now
                </Button>
                <Button color="primary" variant="flat">
                  Add to Cart
                </Button>
              </div>

            </CardBody>
          </Card>               
        
    )
}


export default ProductInfo;