import PageHead from "@/components/commons/PageHead/PageHead"
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TypeProps {
  title: string;
  children: React.ReactNode;
}

const OrderLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    return (
        <>
          <PageHead title={title} />
          <section className="relative flex flex-col items-center justify-center min-h-svh w-full max-w-9xl">
            {children}
          </section>
        </>
    )
}

export default OrderLayout;

