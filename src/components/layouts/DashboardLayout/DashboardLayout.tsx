import PageHead from "@/components/commons/PageHead/PageHead";
import SidebarDashboardLayout from "./SidebarDashboardLayout";
import { LIST_SIDEBAR_ADMIN, LIST_SIDEBAR_MEMBER } from "./listConstanta";
import { ReactNode, useState } from "react";
import Burger from "@/components/ui/Burger";
import { useRouter } from "next/router";

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


    const router = useRouter();
    

    const [isOpenSidebar, setIsOpenSidebar] = useState(true);



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
                      {router.pathname.startsWith("/admin/dashboard") || router.pathname.startsWith("/member/dashboard") ? 
                        "Dashboard" :
                        `${titleHead}`
                      }
                    </h1>
                    {!!description && (
                      <p className="text-sm text-default-400"> 
                        {description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 items-center relative flex-row-reverse lg:flex-row">
                    <Burger isOpen={isOpenSidebar} setOpen={setIsOpenSidebar} size="sm" />

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