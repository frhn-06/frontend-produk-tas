"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Product from "@/components/views/Admin/Product";

const PageAdminProduct = () => {
    return (
      <DashboardLayout type="admin" title="product | admin" titleHead="Products">
        <Product />
      </DashboardLayout>
    )
}

export default PageAdminProduct;