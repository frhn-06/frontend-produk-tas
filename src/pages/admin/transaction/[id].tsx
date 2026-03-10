"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const PageAdminDetailTransaction = () => {
    return (
        <DashboardLayout type="admin" title="Detail Transaction" titleHead="Detail Transaction">
            <DetailTransaction />
        </DashboardLayout>
    )
}

export default PageAdminDetailTransaction;