"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

const PageMemberDashboard = () => {
    return (
      <DashboardLayout type="member" title="dashboard | member" titleHead="Dashboard">
        <Dashboard />
      </DashboardLayout>
    )
}

export default PageMemberDashboard;