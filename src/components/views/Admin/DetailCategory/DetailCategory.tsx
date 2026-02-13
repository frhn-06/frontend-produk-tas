import { Tab, Tabs } from "@heroui/react";
import TabInfo from "./TabInfo";
import useDetailCategory from "./useDetailCategory";
import { useEffect } from "react";
import TabIcon from "./TabIcon";

const DetailCategory = () => {
    const {
        dataCategory,
        isLoadingCategory,
        refetchCategory,
        isRefetchingCategory,

        handleUpdateCategory,
        isPendingUpdateCategory,
        isSuccessUpdateCategory
    } = useDetailCategory();

    useEffect(() => {
      if(isSuccessUpdateCategory) {
        refetchCategory();
      }
    }, [isSuccessUpdateCategory])

    return (
      <div className="flex w-full flex-col lg:w-3xl">
        <Tabs color="primary" aria-label="Options">
          <Tab key="icon" title="icon" >
            <TabIcon 
              data={dataCategory?.data?.icon}
              isLoading={isLoadingCategory}
              isPendingUpdate={isPendingUpdateCategory}
              isRefetching={isRefetchingCategory}
              onUpdate={handleUpdateCategory}
              isSuccessUpdate={isSuccessUpdateCategory}
            />
          </Tab>
          <Tab key="info" title="info">
            <TabInfo 
              data={dataCategory?.data} 
              isLoading={isLoadingCategory} 
              isRefetching={isRefetchingCategory}
              onUpdate={handleUpdateCategory}
              isPendingUpdate={isPendingUpdateCategory}
              isSuccessUpdate={isSuccessUpdateCategory}
            />
          </Tab>
        </Tabs>
      </div>
    )
}

export default DetailCategory;