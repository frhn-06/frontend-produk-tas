import { Tab, Tabs } from "@heroui/react";
import TabPria from "./TabPria";
import TabWanita from "./TabWanita";
import TabAnak from "./TabAnak";
import TabUnisex from "./TabUnisex";
import useProductsByActivity from "./useProductsByActivity";


const ProductsByActivity = () => {
    const {
        dataBanners,
        isLoadingBanners,
        dataActivity,
    } = useProductsByActivity();



    return (

        // <ProductPageLayout >
        <>
        
          <div className="flex justify-between mb-8">
            <h1 className="font-bold text-4xl text-default-700">
              {dataActivity?.data?.name}
            </h1>
          </div>

          <div>
            <Tabs color="primary">
              <Tab key="pria" title="PRIA">
                <TabPria activity={dataActivity?.data} />
              </Tab>
              <Tab key="wanita" title="WANITA">
                <TabWanita activity={dataActivity?.data} />
              </Tab>
              <Tab key="anak" title="ANAK">
                <TabAnak activity={dataActivity?.data} />
              </Tab>
              <Tab key="unisex" title="UNISEX">
                <TabUnisex activity={dataActivity?.data} />
              </Tab>
            </Tabs>
          </div>
        </>

        // </ProductPageLayout>
    )

}

export default ProductsByActivity;