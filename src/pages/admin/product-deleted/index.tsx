"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import ProductDeleted from "@/components/views/Admin/ProductDeleted";

const PageAdminProductDeleted = () => {
    return (
        <DashboardLayout type="admin" title="Admin | Product Deleted" titleHead="Product Deleted">
            <ProductDeleted />
        </DashboardLayout>
    )
}

export default PageAdminProductDeleted;