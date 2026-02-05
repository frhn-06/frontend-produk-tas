import TableUi from "@/components/ui/TableUi";
import COLUMN_LIST from "./Category.constant";
import useCategory from "./useCategory";
import { ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Image } from "@heroui/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";
import AddCategory from "./AddCategory";

const Category = () => {
    const {
        currentPage,
        currentLimit,
        currentSearch,

        setUrl,

        dataCategories,
        isLoadingCategories,
        refetchCategories,
        isRefetchingCategories,
        isSuccessCategories,

        handleSearch,
        handleClearSearch,
        handleLimit,
        handlePagination
    } = useCategory();

    const router = useRouter();

    const modalCategory = useDisclosure();

    useEffect(() => {
      if(router.isReady) setUrl();
    },[router.isReady])

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "icon" :
          return ( 
            <Image src={`${value}`} alt='logo'height={80} width={80} className='mx-auto' />
          );
        case "actions" :
           return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" >
                <DropdownItem key="detail">
                  Detail 
                </DropdownItem>
                <DropdownItem key="delete">
                  Delete 
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
           )
        default :
          return value as ReactNode;
      }
    },[router.push]);

    return (
        <>
          <TableUi 
            columns={COLUMN_LIST}
            renderCell={renderCell}
            data={dataCategories?.data || []}
            isLoading={isLoadingCategories}
            isRefetching={isRefetchingCategories}
            isSuccess={isSuccessCategories}
           
            textEmpty="Category is Empty"
            currentSearch={`${currentSearch}`}
            
            showCreate
            showSearch
            textCreate="Create Category"

            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            onLimit={handleLimit}
            limit={`${currentLimit}`}
            currentPage={Number(currentPage)}
            pagination={dataCategories?.pagination}
            onPagination={handlePagination}

            showLimit
            showPagination

            onOpenModal={modalCategory.onOpen}
          />

          <AddCategory isOpen={modalCategory.isOpen} onClose={modalCategory.onClose} refetch={refetchCategories}
            isRefetching={isRefetchingCategories} />
        </>
    )
}

export default Category;