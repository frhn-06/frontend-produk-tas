"use client"

import ProductPageLayout from "@/components/layouts/ProductPageLayout";
import SaleProduct from "@/components/views/SaleProduct";

const PageSaleProducts = () => {
    return (
        <ProductPageLayout title="Sale Products | Velaro">
            <SaleProduct />
        </ProductPageLayout>
        
    )
}

export default PageSaleProducts;