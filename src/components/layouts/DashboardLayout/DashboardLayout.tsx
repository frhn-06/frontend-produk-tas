import PageHead from "@/components/commons/PageHead/PageHead";
import SidebarDashboardLayout from "./SidebarDashboardLayout";
import { LIST_SIDEBAR_ADMIN, LIST_SIDEBAR_MEMBER } from "./listConstanta";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Burger from "@/components/ui/Burger";
import { Avatar, cn } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "inspector/promises";
import useDashboard from "./useDashboardLayout";
import Link from "next/link";

interface TypeProps {
  title: string;
  type: string;
  titleHead: string;
  children: ReactNode;
  description?: string;
}

const DashboardLayout = (props: TypeProps) => {
    const {
      title,
      type,
      titleHead,
      children,
      description
    } = props;

    const {
      dataUser,
      isLoading
    } = useDashboard();
    

    const [isOpenSidebar, setIsOpenSidebar] = useState(true);

    const [openProfile, setOpenProfile] = useState(true);


    const avatar = useMemo(() => {
      return (
        <>
          <Avatar className="group" src={`${dataUser?.data?.profilePicture}`} showFallback name={dataUser?.data?.fullName} onClick={() => setOpenProfile(!openProfile)} />

          {dataUser?.data && (
            <div className={cn("transition-all duration-300 min-w-20 p-4 bg-white rounded-xl shadow-md absolute top-full right-0", {"scale-1" : openProfile,"scale-0.5" : !openProfile})}>
              <div className="rounded-lg hover:bg-default-200 p-2">
                <Link href={`/${type}/profile`} className="leading-0" >
                  {dataUser?.data?.userName}
                </Link>
              </div>
            </div>
          )}
        </>
      )
    },[dataUser, openProfile, type])

    return (
        <section>
          <PageHead title={title} />

          <div className="flex w-screen h-screen overflow-hidden">
            <SidebarDashboardLayout listSidebar={type === "admin" ? LIST_SIDEBAR_ADMIN : LIST_SIDEBAR_MEMBER} isOpenSidebar={isOpenSidebar} />

            <div className="w-full overflow-y-auto">
              <div className="bg-default-100 pt-4 px-4 lg:pt-6 lg:px-6 flex flex-col">
                <div className="min-h-20 w-full bg-white shadow-lg flex justify-between items-center px-4 rounded-2xl">
                  <div>
                    <h1 className="text-xl font-bold text-default-700">
                      {titleHead}
                    </h1>
                    {!!description && (
                      <p className="text-sm text-default-400"> 
                        {description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 items-center relative flex-row-reverse lg:flex-row">
                    <Burger isOpen={isOpenSidebar} setOpen={setIsOpenSidebar} size="sm" />


                    {avatar}
                  </div>
                </div>
                
                <main className="my-8 flex-1 min-h-screen">
                  {children}
                </main>
              </div>
              
              <div className="min-h-18 bg-white flex justify-center items-center">
                <p className="text-default-700 text-sm">
                  Copyright &copy; 2026 | Velaro Official by frhn
                </p>
              </div>
            </div>
          </div>
        </section>
    )
}

export default DashboardLayout;