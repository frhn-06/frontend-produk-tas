import { IProduct } from "@/types/product";
import Link from "next/link";
import StarUi from "../StarUi";
import convert from "@/utils/convert";

interface TypeProps {
  data: IProduct;
  label: string
}

const CardProduct = (props: TypeProps) => {
    const {
      data,
      label
    } = props;

    return (
        <div className="flex flex-col gap-4">
          <div className="aspect-square flex items-center overflow-hidden relative">
            <Link href={`/products/${data.slug}`}>           
              <img src={`${data.image}`} alt="foto" className="w-full object-cover object-center" />
            </Link>
            <div className="bg-default-900 absolute top-0 left-0 px-1">
              <span className="text-default-100 text-sm font-500">
                {label}
              </span>
            </div>
          </div>
          <div>
            <h1 className=" lg:text-lg text-default-700">
              {data.name}
            </h1>
            <p className="font-bold text-sm text-default-700">
              {convert.IDR(Number(data.price))}
            </p>
            <StarUi dataStar={data?.starsAgr as number} size="sm" comment={data.totalComment} text="sm" disabledComment />
            <p className="text-sm text-default-500">
              ({data.totalComment} review)
            </p> 
          </div>
        </div>
    )
}

export default CardProduct;