import { Tab, Tabs } from "@heroui/react";
import { useEffect } from "react";
import useDetailProduct from "./useDetailProduct";
import TabImage from "./TabImage";
import TabInfo from "./TabInfo";

const DetailProduct = () => {
    const {
        dataProduct,
        isLoadingProduct,
        refetchProduct,
        isRefetchingProduct,

        handleUpdateProduct,
        isPendingUpdateProduct,
        isSuccessUpdateProduct
    } = useDetailProduct();

    useEffect(() => {
      if(isSuccessUpdateProduct) {
        refetchProduct();
      }
    }, [isSuccessUpdateProduct])

    return (
      <div className="flex w-full flex-col lg:w-3xl">
        <Tabs color="primary" aria-label="Options">
          <Tab key="image" title="image">
            <TabImage 
              dataImage={dataProduct?.data?.image}
              dataImages={dataProduct?.data?.images}
              isLoading={isLoadingProduct}
              isRefetching={isRefetchingProduct}
              isPendingUpdate={isPendingUpdateProduct}
              onUpdate={handleUpdateProduct}
              isSuccessUpdate={isSuccessUpdateProduct}
            />
          </Tab>
          <Tab key="info" title="info">
            <TabInfo 
              data={dataProduct?.data}
              isLoading={isLoadingProduct}
              isRefetching={isRefetchingProduct}
              isPendingUpdate={isPendingUpdateProduct}
              onUpdate={handleUpdateProduct}
              isSuccessUpdate={isSuccessUpdateProduct}
            />
          </Tab>
        </Tabs>
      </div>
    )
}

export default DetailProduct;