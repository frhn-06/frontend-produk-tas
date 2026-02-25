import { Tab, Tabs } from "@heroui/react";
import TabPria from "./TabPria";
import TabWanita from "./TabWanita";
import TabAnak from "./TabAnak";
import TabUnisex from "./TabUnisex";
import useProductsByCategory from "./useProductsByCategory";


const ProductsByCategory = () => {
    const {
        dataBanners,
        isLoadingBanners,
        dataCategory,
    } = useProductsByCategory();



    return (

        // <ProductPageLayout >
        <>
        
          <div className="flex justify-between mb-8">
            <h1 className="font-bold text-4xl text-default-700">
              {dataCategory?.data?.name}
            </h1>
          </div>

          <div>
            <Tabs color="primary">
              <Tab key="pria" title="PRIA">
                <TabPria category={dataCategory?.data} />
              </Tab>
              <Tab key="wanita" title="WANITA">
                <TabWanita category={dataCategory?.data} />
              </Tab>
              <Tab key="anak" title="ANAK">
                <TabAnak category={dataCategory?.data} />
              </Tab>
              <Tab key="unisex" title="UNISEX">
                <TabUnisex category={dataCategory?.data} />
              </Tab>
            </Tabs>
          </div>
        </>

        // </ProductPageLayout>
    )

}

export default ProductsByCategory;