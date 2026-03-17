import { MdOutlineManageAccounts, MdOutlinePendingActions, MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GiSchoolBag } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { ReactNode } from "react";
import { PiFlagBannerBold } from "react-icons/pi";

export type ISidebar = {
    label: string;
    id: string;
    href: string;
    icon: ReactNode;
}


const LIST_SIDEBAR_ADMIN = [
    {
        label: "Dashboard",
        id: "dashboard",
        href: "/admin/dashboard",
        icon: <MdOutlineSpaceDashboard className="h-7 w-7" />
    },
    {
        label: "Category",
        id: "category",
        href: "/admin/category",
        icon: <BiCategory className="h-7 w-7" />   
    },
    {
        label: "Product",
        id: "product",
        href: "/admin/product",
        icon: <GiSchoolBag className="h-7 w-7" />   
    },
    {
        label: "Activity",
        id: "activity",
        href: "/admin/activity",
        icon: <MdOutlinePendingActions className="h-7 w-7" />   
    },
    {
        label: "Banner",
        id: "Banner",
        href: "/admin/banner",
        icon: <PiFlagBannerBold  className="h-7 w-7" />   
    },
    {
        label: "Transaction",
        id: "transaction",
        href: "/admin/transaction",
        icon: <IoWalletOutline className="h-7 w-7" />   
    }
]


const LIST_SIDEBAR_MEMBER = [
    {
        label: "Dashboard",
        id: "dashboard",
        href: "/member/dashboard",
        icon: <MdOutlineSpaceDashboard className="h-7 w-7" />
    },
    {
        label: "Profile",
        id: "profile",
        href: "/member/profile",
        icon: <MdOutlineManageAccounts className="h-7 w-7" />   
    },
    {
        label: "Transaction",
        id: "transaction",
        href: "/member/transaction",
        icon: <IoWalletOutline className="h-7 w-7" />   
    },
]


export {LIST_SIDEBAR_ADMIN, LIST_SIDEBAR_MEMBER}