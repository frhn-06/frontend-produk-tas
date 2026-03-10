"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";

const PageAdminTransaction = () => {
    return (
      <DashboardLayout type="admin" title="Transaction | Admin" titleHead="Transactions">
        <Transaction />
      </DashboardLayout>
    )
}

export default PageAdminTransaction;