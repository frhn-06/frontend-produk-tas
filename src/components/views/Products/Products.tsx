import useProducts from "./useProducts";
import {  Tab, Tabs } from "@heroui/react";
import TabPria from "./TabPria";
import TabWanita from "./TabWanita";
import TabAnak from "./TabAnak";
import TabUnisex from "./TabUnisex";

const Products = () => {
    const {
        dataBanners,
        isLoadingBanners,
    } = useProducts();


    return (

        // <ProductPageLayout >

        <>
          <div className="flex justify-between mb-8">
            <h1 className="font-bold text-3xl lg:text-4xl text-default-700">
              NEW        
            </h1>
          </div>

          <div>
            <Tabs color="primary">
              <Tab key="pria" title="PRIA">
                <TabPria />
              </Tab>
              <Tab key="wanita" title="WANITA">
                <TabWanita />
              </Tab>
              <Tab key="anak" title="ANAK">
                <TabAnak />
              </Tab>
              <Tab key="unisex" title="UNISEX">
                <TabUnisex />
              </Tab>
            </Tabs>
          </div>
        </>
        // </ProductPageLayout>
    )

}

export default Products;