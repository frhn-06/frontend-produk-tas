import { Tab, Tabs } from "@heroui/react";
import TabProfile from "./TabProfile";
import useProfile from "./useProfile";
import TabPassword from "./TabPassword";

const Profile = () => {
    const {
      dataMe,
      isLoadingDataMe,
      refetchDataMe,
      isRefetchingDataMe,

      handleUpdateProfile,
      isPendingUpdateProfile,
      isSuccessUpdateProfile,

       handleUpdatePassword,
        isPendingUpdatePassword,
        isSuccessUpdatePassword
    } = useProfile();

    return (
        <div className="flex w-full flex-col lg:w-3xl">
          <Tabs color="primary" aria-label="Options">
            <Tab key="profile" title="profile" >
              <TabProfile data={dataMe?.data} isLoading={isLoadingDataMe} refetch={refetchDataMe} isRefetching={isRefetchingDataMe} onUpdate={handleUpdateProfile} isPending={isPendingUpdateProfile} isSuccess={isSuccessUpdateProfile} />
            </Tab>

            <Tab key="password" title="password">
              <TabPassword data={dataMe?.data} isLoading={isLoadingDataMe} refetch={refetchDataMe} isRefetching={isRefetchingDataMe} onUpdate={handleUpdatePassword} isPending={isPendingUpdatePassword} isSuccess={isSuccessUpdatePassword} />
            </Tab>
            
          </Tabs>
        </div>
    )
}

export default Profile;