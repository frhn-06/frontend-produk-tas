"use client"

import AuthLayout from "@/components/layouts/AuthLayout"


const PageSuccessRegister = () => {
    return(
      <>
        <AuthLayout title={"success registration"}>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl text-primary">
              Success Registration
            </h1>
            <p className="text-default-700 font-semibold">
              Please check your email for activation
            </p>
          </div>
        </AuthLayout>
      </>
    )
}

export default PageSuccessRegister;