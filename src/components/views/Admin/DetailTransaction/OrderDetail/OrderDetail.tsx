import { IDataOrder } from "@/types/order";
import convert from "@/utils/convert";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface TypeProps {
  data: IDataOrder
}

const OrderDetail = (props: TypeProps) => {
    const {
      data
    } = props;

    return (
        <Card className="p-4">
          <CardHeader className="text-default-700 font-bold">
            ORDER DETAIL
          </CardHeader>
          <CardBody>
            <div className="flex">
              <div className="min-w-fit flex flex-col justify-center">
                <h4 className="text-default-700 font-semibold">
                  Order_Id
                </h4>
                <h4 className="text-default-700 font-semibold">
                  Status
                </h4>
                <h4 className="text-default-700 font-semibold">
                  Date
                </h4>
              </div>
              <div className="px-6 flex flex-col justify-center">
                <span className="text-default-700 font-bold">
                  :
                </span>
                <span className="text-default-700 font-bold">
                  :
                </span>
                <span className="text-default-700 font-bold">
                  :
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-default-700">
                  {data?.orderId}
                </p>
                <p className="text-default-700">
                  {data?.status === "settlement" ? "completed" : data?.status}
                </p>
                <p className="text-default-700">
                  {convert.time1(`${data?.createdAt}`)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
    )
}

export default OrderDetail;