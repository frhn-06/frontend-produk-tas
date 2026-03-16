"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const PageAdminDashboard = () => {
    return (
      <DashboardLayout type="admin" title="dashboard | admin" titleHead="Dashboard">
        <Dashboard />
      </DashboardLayout>
    )
}

export default PageAdminDashboard;