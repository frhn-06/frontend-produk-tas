import { IProduct } from "@/types/product";
import Link from "next/link";
import StarUi from "../StarUi";
import convert from "@/utils/convert";
import { cn } from "@/utils/cn";

interface TypeProps {
  data: IProduct;
  label: string;
  isDiscount?: boolean;
}

const CardProduct = (props: TypeProps) => {
    const {
      data,
      label,
      isDiscount = false
    } = props;

    return (
        <Link href={`/products/${data.slug}`} className="flex flex-col gap-4 group active:bg-default-200">
          <div className="aspect-square flex items-center overflow-hidden relative group-active:bg-default-200">
            <div>           
              <img src={`${data.image}`} alt="foto" className="w-full object-cover object-center" />
            </div>
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
            <p className={cn("font-bold text-sm text-default-700", {"line-through text-default-400": isDiscount})}>
              {convert.IDR(Number(data.price))}
            </p>
            {isDiscount && (
              <p className="font-bold text-sm text-default-700">
                {convert.IDR(Number(data.price) - (Number(data.price) * Number(data.discount)) / 100)}
              </p>
            )}
            <StarUi dataStar={data?.starsAgr as number} size="sm" comment={data.totalComment} text="sm" disabledComment />
            <p className="text-sm text-default-500">
              ({data.totalComment} review)
            </p> 
          </div>
        </Link>
    )
}

export default CardProduct;