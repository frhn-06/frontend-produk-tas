import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import useDetailTransaction from "./useDetailTransaction";
import convert from "@/utils/convert";
import OrderDetail from "./OrderDetail";
import CustomerInfo from "./CustomerInfo";
import ShippingAddress from "./ShippingAddress";
import { ReactNode, useCallback } from "react";
import TableUi from "@/components/ui/TableUi";
import COLUMN_LIST from "./DetailTransactionProduct.constant";
import { useRouter } from "next/router";

const DetailTransaction = () => {
    const {
      dataUser,
      isLoadingUser,

      dataOrder,
      isLoadingOrder
    } = useDetailTransaction();

    const router = useRouter();

    const renderCell = useCallback((data: Record<string, unknown>, column: {label:string; id:string} ) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "price" :
          return ( 
            <span>
              {convert.IDR(Number(data.price))}
            </span>
          );
        default :
          return value as ReactNode;
      }
    },[router.push]);

    return (
        <>
          <div className="mb-8">
            <Skeleton isLoaded={!!dataOrder} className="rounded-2xl">
              <OrderDetail data={dataOrder?.data} />
            </Skeleton>
          </div>

          <div className="flex gap-4 flex-col lg:flex-row">
            <Skeleton isLoaded={!!dataUser} className="flex-1 rounded-2xl">
              <div className="flex-1 w-full">
                <CustomerInfo data={dataUser?.data} />
              </div>
            </Skeleton>

            <Skeleton isLoaded={!!dataOrder} className="flex-1 rounded-2xl">
              <div className="flex-1">
                <ShippingAddress data={dataOrder?.data} />
              </div>
            </Skeleton>
          </div>

          {Object.keys(router.query).length > 0 && (
            <TableUi 
              columns={COLUMN_LIST}
              renderCell={renderCell}
              data={dataOrder?.data?.products || []}
              isLoading={isLoadingOrder }
             
              textEmpty="Order is Empty"
              
            />
          )}
          
        </>
    )
}

export default DetailTransaction;