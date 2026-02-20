import TableUi from "@/components/ui/TableUi";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from "@heroui/image";
import {  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

import Link from "next/link";
import useBanner from "./useBanner";
import COLUMN_LIST from "./Banner.constant";
import AddBanner from "./AddBanner";
import DeleteBanner from "./DeleteBanner";

const Banner = () => {
    const {
        currentPage,
        currentLimit,

        setUrl,

        dataBanners,
        isLoadingBanners,
        refetchBanners,
        isRefetchingBanners,
        isSuccessBanners,

        handleLimit,
        handlePagination
    } = useBanner();

    const router = useRouter();

    const modalAddBanner = useDisclosure();

    const modalDeleteBanner = useDisclosure();

    const [idBanner, setIdBanner] = useState<string | null>(null);

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
                <DropdownItem key="detail" as={Link} href={`/admin/banner/${data._id}`}>
                  Detail
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => {setIdBanner(`${data._id}`); modalDeleteBanner.onOpen()}}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
           )
        default :
          return value as ReactNode;
      }
    },[router.push, modalDeleteBanner]);

    return (
        <>
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataBanners?.data || []}
              isLoading={isLoadingBanners || isRefetchingBanners}
              isSuccess={isSuccessBanners}
             
              textEmpty="Banner is Empty"
              
              showCreate
              placeholderSearch="Search Banner"
              textCreate="Create Banner"
  
              onLimit={handleLimit}
              limit={`${currentLimit}`}
              currentPage={Number(currentPage)}
              pagination={dataBanners?.pagination}
              onPagination={handlePagination}
  
              showLimit
              showPagination
  
              onOpenModal={modalAddBanner.onOpen}
            />
          )}

          <AddBanner isOpen={modalAddBanner.isOpen} onClose={modalAddBanner.onClose} refetch={refetchBanners}
            isRefetching={isRefetchingBanners} />

          <DeleteBanner isOpen={modalDeleteBanner.isOpen} onClose={modalDeleteBanner.onClose} bannerId={idBanner || null}  refetch={refetchBanners} setIdBanner={setIdBanner} />
        </>
    )
}

export default Banner;