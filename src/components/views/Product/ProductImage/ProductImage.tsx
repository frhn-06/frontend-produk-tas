import { IProduct } from "@/types/product";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface TypeProps {
  data: IProduct;
}


const ProductImage = (props: TypeProps) => {
    const {
      data
    } = props;

    const fotos = [data.image, ...(data?.images as string[])]
    const [mainFoto, setMainFoto] = useState(fotos[0]);

    return (
          <>
            <div className="flex-4 flex justify-center items-center">
              <img src={`${mainFoto}`} className="w-full aspect-square object-center object-cover" />
            </div>
            
            <div className="flex-1 overflow-auto">
              <div className="h-28 flex flex-row lg:flex-col gap-2">
                {(fotos as string[])?.map((foto:string, i) => (
                  <div key={i} className="relative border-1 border-gray-400/40 aspect-square bg-amber-200" onClick={() => setMainFoto(fotos[i])}>
                    <div className={cn("absolute w-full h-full bg-black/30 opacity-0 transition duration-300", {"opacity-100": mainFoto === foto})}></div>
                    <img src={foto} alt="fotoimages" className="w-full aspect-square object-center object-cover" />

                  </div>
                ))}
              </div>
            </div>
          </>
        
    )
}

export default ProductImage;