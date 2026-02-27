import { IProduct } from "@/types/product";
import { Accordion, AccordionItem } from "@heroui/react";

interface TypeProps {
  data: IProduct;
}

const ProductDescription = (props: TypeProps) => {
    const {
      data
    } = props;

    return (
        <Accordion variant="bordered">
          <AccordionItem title={(
            <h1 className="text-default-700 font-semibold">Deskripsi</h1>
          )} 
          className="text-default-700">
            <div className="py-2">
              {data?.description}
            </div>
          </AccordionItem>
        </Accordion>
    )
}

export default ProductDescription;