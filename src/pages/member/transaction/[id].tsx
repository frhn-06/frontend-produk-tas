"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const PageMemberDetailTransaction = () => {
    return (
        <DashboardLayout type="member" title="Detail Transaction" titleHead="Detail Transaction">
            <DetailTransaction />
        </DashboardLayout>
    )
}

export default PageMemberDetailTransaction;