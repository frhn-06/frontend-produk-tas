import TableUi from "@/components/ui/TableUi";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {  Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";
import Link from "next/link";
import useTransaction from "./useTransaction";
import COLUMN_LIST from "./Transaction.constant";
import convert from "@/utils/convert";
import { statusC } from "@/utils/constant";


const Transaction = () => {
    const {
        currentPage,
        currentLimit,
        currentStatusOrder,

        setUrl,

        dataOrders,
        isLoadingOrders,
        refetchOrders,
        isRefetchingOrders,
        isSuccessOrders,
        
        handleLimit,
        handlePagination,
        handleStatus
    } = useTransaction();

    const router = useRouter();

    const modalAddOrder = useDisclosure();

    const modalDeleteOrder = useDisclosure();

    const [idOrder, setIdOrder] = useState<string | null>(null);

    useEffect(() => {
      if(router.isReady) setUrl();
    },[router.isReady])

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "createdAt" :
          return (
            <p>
              {convert.time1(`${data.createdAt}`)}
            </p>
          )
        case "status" :
          return (
            <Chip color={data.status === "settlement" ? "success" : data.status === "expired" ? "danger" : "warning"} variant="flat">
              {data.status === "settlement" ? "Completed" : data.status === "expired" ? "Expired" : "Pending"}
            </Chip>
          )
        case "actions" :
          return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" >
                <DropdownItem key="detail" as={Link} href={`/admin/transaction/${data._id}`}>
                  Detail
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => {setIdOrder(`${data._id}`); modalDeleteOrder.onOpen()}}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
        default :
          return value as ReactNode;
      }
    },[router.push, modalDeleteOrder]);

    return (
        <>
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataOrders?.data || []}
              isLoading={isLoadingOrders || isRefetchingOrders}
              isSuccess={isSuccessOrders}
             
              textEmpty="Order is Empty"
  
              onLimit={handleLimit}
              limit={`${currentLimit}`}
              currentPage={Number(currentPage)}
              pagination={dataOrders?.pagination}
              onPagination={handlePagination}
  
              showLimit
              showPagination
  
              onOpenModal={modalAddOrder.onOpen}

              ShowStatus
              status={`${currentStatusOrder}` || "allstatus"}
              onStatus={handleStatus}
            />
          )}
          
        </>
    )
}

export default Transaction;