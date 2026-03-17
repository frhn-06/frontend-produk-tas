import { Button, cn } from "@heroui/react";
import { RiLogoutBoxLine } from "react-icons/ri";
import Image from "next/image";

import { ISidebar } from "../listConstanta";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface TypeProps {
  listSidebar: ISidebar[];
  isOpenSidebar?: boolean
}

const SidebarDashboardLayout = (props: TypeProps) => {
    const {
      listSidebar,
      isOpenSidebar = true
    } = props;

    const router = useRouter();

    return (
      <div className={cn("z-20 sidebarawal fixed top-0 min-h-screen p-2 max-w-21 overflow-hidden lg:relative transition-width duration-300 flex flex-col justify-between shadow-xl bg-white", {"sidebarsecond" : !isOpenSidebar})}>
        <div>
          <div className="flex justify-center items-center py-6 border-b-2 border-b-default-100">
            <Link href="/">
              <Image src={"/images/img/logo/logo-velaro.png"} alt="logo" width={370} height={370} />
            </Link>
          </div>
          
          <ul>
            {listSidebar.map((li) => (
              <Link key={li.id} href={li.href} className={cn("mx-auto flex items-center gap-2 mt-2 bg-default-200/40 active:bg-default-200 p-2 rounded-xl text-default-800 transition", {"w-fit" : !isOpenSidebar, "bg-primary text-white" : router.pathname.startsWith(li.href), "hover:bg-default-700/20" : !router.pathname.startsWith(li.href)})} >
                {li.icon}
                <span className={cn("hidden lg:block text-lg", {"lg:hidden": !isOpenSidebar})}>
                  {li.label}
                </span>
              </Link>
            ))}
          </ul>
        </div>

        <Button variant="flat" className="text-default-700 bg-transparent w-fit">
          <RiLogoutBoxLine className="h-7 w-7 rounded-xl active:bg-default-200" onClick={() => signOut()} />
          <span className={cn("hidden lg:block", {"lg:hidden": !isOpenSidebar} )} onClick={() => signOut()}>
            Logout
          </span>
        </Button>
        
      </div>
    )
}

export default SidebarDashboardLayout;