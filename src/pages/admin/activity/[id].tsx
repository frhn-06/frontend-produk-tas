"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailActivity from "@/components/views/Admin/DetailActivity"

const PageAdminDetailActivity = () => {
    return (
        <DashboardLayout type="admin" title="detail | activity" titleHead="Detail Activity">
            <DetailActivity />
        </DashboardLayout>
    )
}

export default PageAdminDetailActivity;