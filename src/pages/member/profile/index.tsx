"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const PageMemberProfile = () => {
    return (
      <DashboardLayout type="member" title="Profile | Member" titleHead="Profile">
        <Profile />
      </DashboardLayout>
    )
}

export default PageMemberProfile;