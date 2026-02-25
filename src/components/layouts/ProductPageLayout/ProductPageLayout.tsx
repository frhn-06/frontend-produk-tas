
import { cn } from "@/utils/cn";
import { ReactNode, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import useNavSamping from "./NavFilterProducts/useNavSamping";
import LandingPageLayout from "../LandingPageLayout";
import NavFilterProducts from "@/components/layouts/ProductPageLayout/NavFilterProducts";

interface TypeProps {
  children: ReactNode;
  title: string;
}

const ProductPageLayout = (props: TypeProps) => {
    const {
      children,
      title
    } = props;

    const {
        dataCategories,
        isLoadingCategories,
        dataActivities,
        isLoadingActivities
    } = useNavSamping();

    const [openNav, setOpenNav] = useState(false)
    return (

      <LandingPageLayout title={title}>
        <section className="flex min-h-700 max-w-7xl mx-auto bg-white">
          <NavFilterProducts categories={dataCategories?.data || []} activities={dataActivities?.data || []} isLoadingCategories={isLoadingCategories} isLoadingActivities={isLoadingActivities} openNav={openNav} setOpenNav={setOpenNav} />
          
          

          <div className="p-4 relative w-full min-h-screen">
            <div className="lg:hidden border-2 border-default-500/30 p-1 absolute left-0 bg-white" onClick={() => setOpenNav(!openNav)}>
              <FaChevronRight className={cn("transition duration-200", {"rotate-180": openNav})} />
            </div>

          
            {/* <ProductSlider dataBanners={dataBanners?.data || []} isLoading={isLoadingBanners} /> */}
            {children}
           
          </div>
        </section> 
      </LandingPageLayout>
    )
}

export default ProductPageLayout;