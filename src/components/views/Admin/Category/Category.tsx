import TableUi from "@/components/ui/TableUi";
import COLUMN_LIST from "./Category.constant";
import useCategory from "./useCategory";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from "@heroui/image";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import Link from "next/link";

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

    const modalAddCategory = useDisclosure();

    const modalDeleteCategory = useDisclosure();

    const [idCategory, setIdCategory] = useState<string | null>(null);

    useEffect(() => {
      if(router.isReady) setUrl();
    },[router.isReady])

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "icon" :
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
                <DropdownItem key="detail" as={Link} href={`/admin/category/${data._id}`}>
                  Detail
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => {setIdCategory(`${data._id}`); modalDeleteCategory.onOpen()}}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
           )
        default :
          return value as ReactNode;
      }
    },[router.push, modalDeleteCategory]);

    return (
        <>
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataCategories?.data || []}
              isLoading={isLoadingCategories || isRefetchingCategories}
              isSuccess={isSuccessCategories}
             
              textEmpty="Category is Empty"
              currentSearch={`${currentSearch}`}
              
              showCreate
              showSearch
              placeholderSearch="Search Category"
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
  
              onOpenModal={modalAddCategory.onOpen}
            />
          )}

          <AddCategory isOpen={modalAddCategory.isOpen} onClose={modalAddCategory.onClose} refetch={refetchCategories}
            isRefetching={isRefetchingCategories} />

          <DeleteCategory isOpen={modalDeleteCategory.isOpen} onClose={modalDeleteCategory.onClose} categoryId={idCategory || null}  refetch={refetchCategories} setIdCategory={setIdCategory} />
        </>
    )
}

export default Category;