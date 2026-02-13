"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailCategory from "@/components/views/Admin/DetailCategory"

const PageAdminDetailCategory = () => {
    return (
        <DashboardLayout type="admin" title="detail category" titleHead="Detail Category">
            <DetailCategory />
        </DashboardLayout>
    )
}

export default PageAdminDetailCategory;