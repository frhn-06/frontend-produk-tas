import PageHead from "@/components/commons/PageHead/PageHead"
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TypeProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    return (
        <>
          <PageHead title={title} />
          <section className="relative flex flex-col items-center justify-center min-h-svh p-4 py-20 bg-[url(/images/svg/general/bg-auth.svg)] bg-center bg-size bg-cover">
            <div className="flex flex-col justify-center items-center gap-4 lg:flex-row w-full lg:w-2/3">
              <div className="w-1/2 flex flex-col items-center justify-center">
                <Image src={"/images/img/logo/logo-velaro.png"} alt="logo2" width={1080} height={720} className="w-100" />
              </div>
              {children}        
            </div>
            <Link href="/" className="absolute bottom-2 right-2 text-primary underline">
              Home
            </Link>
          </section>
        </>
    )
}

export default AuthLayout;

