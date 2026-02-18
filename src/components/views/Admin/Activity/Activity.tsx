import TableUi from "@/components/ui/TableUi";
import COLUMN_LIST from "./Activity.constant";
import useActivity from "./useActivity";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from "@heroui/image";
import {  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

import Link from "next/link";
import AddActivity from "./AddActivity";
import DeleteActivity from "./DeleteActivity";

const Activity = () => {
    const {
        currentPage,
        currentLimit,

        setUrl,

        dataActivities,
        isLoadingActivities,
        refetchActivities,
        isRefetchingActivities,
        isSuccessActivities,

        handleLimit,
        handlePagination
    } = useActivity();

    const router = useRouter();

    const modalAddActivity = useDisclosure();

    const modalDeleteActivity = useDisclosure();

    const [idActivity, setIdActivity] = useState<string | null>(null);

    useEffect(() => {
      if(router.isReady) setUrl();
    },[router.isReady])

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "image" :
          return ( 
            <Image src={`${value}`} alt='logo'height={80} width={80} className='mx-auto aspect-square' />
          );
        case "actions" :
           return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" >
                <DropdownItem key="detail" as={Link} href={`/admin/activity/${data._id}`}>
                  Detail
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => {setIdActivity(`${data._id}`); modalDeleteActivity.onOpen()}}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
           )
        default :
          return value as ReactNode;
      }
    },[router.push, modalDeleteActivity]);

    return (
        <>
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataActivities?.data || []}
              isLoading={isLoadingActivities || isRefetchingActivities}
              isSuccess={isSuccessActivities}
             
              textEmpty="Activity is Empty"
              
              showCreate
              placeholderSearch="Search Activity"
              textCreate="Create Activity"
  
              onLimit={handleLimit}
              limit={`${currentLimit}`}
              currentPage={Number(currentPage)}
              pagination={dataActivities?.pagination}
              onPagination={handlePagination}
  
              showLimit
              showPagination
  
              onOpenModal={modalAddActivity.onOpen}
            />
          )}

          <AddActivity isOpen={modalAddActivity.isOpen} onClose={modalAddActivity.onClose} refetch={refetchActivities}
            isRefetching={isRefetchingActivities} />

          <DeleteActivity isOpen={modalDeleteActivity.isOpen} onClose={modalDeleteActivity.onClose} categoryId={idActivity || null}  refetch={refetchActivities} setIdActivity={setIdActivity} />
        </>
    )
}

export default Activity;