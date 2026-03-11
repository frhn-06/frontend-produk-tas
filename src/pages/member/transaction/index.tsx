"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

const PageMemberTransaction = () => {
    return (
      <DashboardLayout type="member" title="Transaction | Member" titleHead="Transactions">
        <Transaction />
      </DashboardLayout>
    )
}

export default PageMemberTransaction;