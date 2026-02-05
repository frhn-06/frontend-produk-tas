"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import Category from "@/components/views/Admin/Category"

const PageAdminCategory = () => {
    return (
        <DashboardLayout type="admin" title="admin | category" titleHead="Category" description="Manage your Category">
          <Category />
        </DashboardLayout>
    )
}

export default PageAdminCategory