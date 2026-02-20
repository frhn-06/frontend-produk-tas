import { Tab, Tabs } from "@heroui/react";
import useDetailBanner from "./useDetailBanner";
import { useEffect } from "react";
import TabImage from "./TabImage";
import TabInfo from "./TabInfo";

const DetailBanner = () => {
    const {
        dataBanner,
        isLoadingBanner,
        refetchBanner,
        isRefetchingBanner,

        handleUpdateBanner,
        isPendingUpdateBanner,
        isSuccessUpdateBanner
    } = useDetailBanner();

    useEffect(() => {
      if(isSuccessUpdateBanner) {
        refetchBanner();
      }
    }, [isSuccessUpdateBanner])

    return (
      <div className="flex w-full flex-col lg:w-3xl">
        <Tabs color="primary" aria-label="Options">
          <Tab key="image" title="image" >
            <TabImage 
              data={dataBanner?.data?.image}
              isLoading={isLoadingBanner}
              isPendingUpdate={isPendingUpdateBanner}
              isRefetching={isRefetchingBanner}
              onUpdate={handleUpdateBanner}
              isSuccessUpdate={isSuccessUpdateBanner}
            />
          </Tab>
          <Tab key="info" title="info">
            <TabInfo 
              data={dataBanner?.data} 
              isLoading={isLoadingBanner} 
              isRefetching={isRefetchingBanner}
              onUpdate={handleUpdateBanner}
              isPendingUpdate={isPendingUpdateBanner}
              isSuccessUpdate={isSuccessUpdateBanner}
            />
          </Tab>
        </Tabs>
      </div>
    )
}

export default DetailBanner;