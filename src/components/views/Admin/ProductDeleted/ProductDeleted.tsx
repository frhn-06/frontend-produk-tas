import TableUi from "@/components/ui/TableUi";
import useProductDeleted from "./useProductDeleted";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, useDisclosure } from "@heroui/react";
import convert from "@/utils/convert";
import { CiMenuKebab } from "react-icons/ci";
import COLUMN_LIST from "./ProductDeleted.constant";
import ModalRestoreProduct from "./RestoreProduct";
import ModalDeletePermanentProduct from "./DeletePermanentProduct";

const ProductDeleted = () => {
    const {
        currentPage,
        currentLimit,
        currentSearch,

        setUrl,

        dataProductDeleted,
        isLoadingProductDeleted,
        refetchProductDeleted,
        isRefetchingProductDeleted,
        isSuccessProductDeleted,

        handleSearch,
        handleClearSearch,
        handleLimit,
        handlePagination
    } = useProductDeleted();


    const router = useRouter();

    const RestoreProduct = useDisclosure();
    const DeletePermanent = useDisclosure();

    const [productId, setProductId] = useState<string | null>(null)
    const [productIdd, setProductIdd] = useState<string | null>(null)


    useEffect(() => {
      if(router.isReady) setUrl();
    },[router.isReady])

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "categoryId" :
          return (
            <Link href={`${column.id}`} className="text-default-700">
              {(value as {name: string;}).name}
            </Link>
          )
        case "price" :
          return (
            convert.IDR(Number(value))
          )
        case "actions" :
           return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" >
                <DropdownItem key="detail" onPress={() => {setProductId(`${data?._id}`); RestoreProduct.onOpen()}}>
                  Restore
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => {setProductId(`${data?._id}`); DeletePermanent.onOpen()}}>
                  Delete Permanen
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
           )
        default :
          return value as ReactNode;
      }
    },[router.push, RestoreProduct, DeletePermanent]);

    return (
        <>
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataProductDeleted?.data || []}
              isLoading={isLoadingProductDeleted || isRefetchingProductDeleted}
              isSuccess={isSuccessProductDeleted}
             
              textEmpty="Product Deleted is Empty"
              currentSearch={`${currentSearch}`}
            
              showSearch
              placeholderSearch="Search Product Deleted"
  
              onSearch={handleSearch}
              onClearSearch={handleClearSearch}
              onLimit={handleLimit}
              limit={`${currentLimit}`}
              currentPage={Number(currentPage)}
              pagination={dataProductDeleted?.pagination}
              onPagination={handlePagination}
  
              showLimit
              showPagination

              isTableDelete
            />
          )}

          <ModalRestoreProduct 
            isOpen={RestoreProduct.isOpen}
            onClose={RestoreProduct.onClose}
            productId={productId}
            setIdProduct={setProductId}
            refetch={refetchProductDeleted}
          />

          <ModalDeletePermanentProduct 
            isOpen={DeletePermanent.isOpen}
            onClose={DeletePermanent.onClose}
            productId={productId}
            setIdProduct={setProductId}
            refetch={refetchProductDeleted}
          />
        </>
    )
}

export default ProductDeleted;