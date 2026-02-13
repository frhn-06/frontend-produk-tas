import TableUi from "@/components/ui/TableUi";
import COLUMN_LIST from "./Product.constant";
import useProduct from "./useProduct";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from "@heroui/image";
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";
import Link from "next/link";
import convert from "@/utils/convert";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";

const Product = () => {
    const {
        currentPage,
        currentLimit,
        currentSearch,

        setUrl,

        dataProducts,
        isLoadingProducts,
        refetchProducts,
        isRefetchingProducts,
        isSuccessProducts,

        handleSearch,
        handleClearSearch,
        handleLimit,
        handlePagination
    } = useProduct();

    const router = useRouter();

    const modalAddProduct = useDisclosure();

    const modalDeleteProduct = useDisclosure();

    const [idProduct, setIdProduct] = useState<string | null>(null);

    useEffect(() => {
      if(router.isReady) setUrl();
    },[router.isReady])

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "image" :
          return ( 
            <Image src={`${data.image}`} alt='logo'height={80} width={80} className='mx-auto aspect-square' />
          );
        case "categoryId" :
          return (
            <Link href={`${column.id}`} >
              {(value as {name: string;}).name}
            </Link>
          )
        case "isPublish" :
          return (
            <Chip color={value === true ? "success" : "warning"} variant="flat">
              {value === true ? "Active" : "Non Active"} 
            </Chip>
          )
        case "price" :
          return (
            convert.IDR(Number(value))
          )
        case "description" :
          return (
            <p className="line-clamp-3">
              {value as ReactNode}
            </p>
          )
        case "actions" :
           return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" >
                <DropdownItem key="detail" as={Link} href={`/admin/product/${data._id}`}>
                  Detail
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => {setIdProduct(`${data._id}`); modalDeleteProduct.onOpen()}}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
           )
        default :
          return value as ReactNode;
      }
    },[router.push, modalDeleteProduct]);

    return (
        <>
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataProducts?.data || []}
              isLoading={isLoadingProducts || isRefetchingProducts}
              isSuccess={isSuccessProducts}
             
              textEmpty="Product is Empty"
              currentSearch={`${currentSearch}`}
              
              showCreate
              showSearch
              textCreate="Create Category"
  
              onSearch={handleSearch}
              onClearSearch={handleClearSearch}
              onLimit={handleLimit}
              limit={`${currentLimit}`}
              currentPage={Number(currentPage)}
              pagination={dataProducts?.pagination}
              onPagination={handlePagination}
  
              showLimit
              showPagination
  
              onOpenModal={modalAddProduct.onOpen}
            />
          )}

          <AddProduct isOpen={modalAddProduct.isOpen} onClose={modalAddProduct.onClose} refetch={refetchProducts}
            isRefetching={isRefetchingProducts}/>

          <DeleteProduct isOpen={modalDeleteProduct.isOpen} onClose={modalDeleteProduct.onClose} productId={idProduct || null}  refetch={refetchProducts} setIdProduct={setIdProduct} />
        </>
    )
}

export default Product;