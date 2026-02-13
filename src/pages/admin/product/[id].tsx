"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailProduct from "@/components/views/Admin/DetailProduct"

const PageAdminDetailProduct = () => {
    return (
        <DashboardLayout type="admin" title="detail product" titleHead="Detail Product">
            <DetailProduct />
        </DashboardLayout>
    )
}

export default PageAdminDetailProduct;