"use client"

import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

const PageRegister = () => {
    return (
        <AuthLayout title="Velaro | registartion">
          <Register />
        </AuthLayout>
    )
}

export default PageRegister;