import { IActivity } from "@/types/activity";
import { ICategory } from "@/types/category";
import { cn } from "@/utils/cn";
import {  BreadcrumbItem, Breadcrumbs, Button, Link } from "@heroui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface TypeProps {
  categories: ICategory[];
  activities: IActivity[];
  isLoadingCategories: boolean;
  isLoadingActivities: boolean;
  openNav: boolean;
  setOpenNav: Dispatch<SetStateAction<boolean>>
}

const NavFilterProducts = (props: TypeProps) => {
    const {
      categories,
      activities,
      isLoadingCategories,
      isLoadingActivities,
      setOpenNav,
      openNav
    } = props;

    const router = useRouter();

    const objChevron = {
      gender: false,
      categories: false,
      activities: false
    }

    const [chevron, setChevron] = useState(objChevron);

    return (
        <div className={cn("bg-white min-h-screen z-10 absolute -translate-x-full min-w-72 p-4 border-r-1 lg:relative lg:translate-x-0 transition duration-200", {"translate-x-0": openNav})}>
          <div className=" flex flex-col gap-8 ">
            <div className="flex justify-end items-center lg:hidden">
              <IoIosCloseCircleOutline className="text-default-700 h-8 w-8" onClick={() => setOpenNav(!openNav)} />
            </div>

            <div className="border-b-2 border-gray-400/30 px-4">
              <div className="flex justify-between items-center py-1 px-2">
                <Link href="/products" className={cn("font-bold text-default-600 text-xl", {"text-primary" : router.pathname === "/products"})}>
                  All Products
                </Link>
              </div>
            </div>

            <div className="border-b-2 border-gray-400/30 px-4">
              <div className="flex justify-between items-center py-1 px-2">
                <h1 className="font-bold text-default-700 text-xl">
                  CATEGORIES
                </h1>
                <span onClick={() => setChevron({...chevron, categories: !chevron.categories})}>
                  <FaChevronUp  className={cn("transition duration-200", {"rotate-180" : chevron.categories})} />
                </span>
              </div>
              <div className={cn("text-sm py-1 px-2 flex flex-col gap-2 justify-around max-h-full overflow-hidden transition duration-200", {"max-h-0": chevron.categories})}>
                {categories?.map(c => (
                  <Link key={c._id} href={`/products/category/${c._id}`} className={cn("text-sm w-full font-semibold text-default-600", {"text-primary" : router.query.id === c._id})}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b-2 border-gray-400/30 px-4">
              <div className="flex justify-between items-center py-1 px-2">
                <h1 className="font-bold text-default-700 text-xl">
                  ACTIVITIES
                </h1>
                <span onClick={() => setChevron({...chevron, activities: !chevron.activities})}>
                  <FaChevronUp className={cn("transition duration-200", {"rotate-180" : chevron.activities})} />
                </span>
              </div>
              <div className={cn("text-sm py-1 px-2 flex flex-col gap-2 justify-around max-h-full overflow-hidden transition duration-200", {"max-h-0": chevron.activities})}>
                {activities?.map(a => (
                  <Link key={a._id} href={`/products/activity/${a._id}`} className={cn("text-sm w-full font-semibold text-default-600", {"text-primary" : router.query.id === a._id})}>
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-4">
              <div className="flex justify-between items-center py-1 px-2">
                <Link href="/sale-products">
                  <Button className="text-default-100" color="primary">
                    Sale Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    )

}

export default NavFilterProducts;