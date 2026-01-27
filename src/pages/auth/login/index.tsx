"use client"

import AuthLayout from "@/components/layouts/AuthLayout"
import Login from "@/components/views/Auth/Login";

const PageLogin = () => {
    return (
        <AuthLayout title="Velaro | SignIn">
          <Login /> 
        </AuthLayout>
    )
}

export default PageLogin;