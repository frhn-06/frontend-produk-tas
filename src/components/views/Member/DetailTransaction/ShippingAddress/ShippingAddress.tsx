import { IUser } from "@/types/auth";
import { IDataOrder } from "@/types/order";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface TypeProps {
  data: IDataOrder;
}

const ShippingAddress = (props: TypeProps) => {
    const {
      data
    } = props;
    return (
        <Card className="p-4">
          <CardHeader className="text-default-700 font-bold">
            ShippingAddress
          </CardHeader>
          <CardBody>
            <div className="flex">
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-default-700">
                  Name
                </h3>
                <h3 className="font-semibold text-default-700">
                  Phone
                </h3>
                <h3 className="font-semibold text-default-700">
                  Address
                </h3>
              </div>
              <div className="px-6 flex flex-col justify-center">
                <span className="font-bold text-default-700">:</span>
                <span className="font-bold text-default-700">:</span>
                <span className="font-bold text-default-700">:</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-default-700">
                  {data?.shippingAddress?.name}
                </p>
                <p className="text-default-700">
                  {data?.shippingAddress?.phone}
                </p>
                <p className="text-default-700">
                  {data?.shippingAddress?.address}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
    )
}

export default ShippingAddress;