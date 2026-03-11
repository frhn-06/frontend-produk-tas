import { IUser } from "@/types/auth";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface TypeProps {
  data: IUser;
}

const CustomerInfo = (props: TypeProps) => {
    const {
      data
    } = props;
    return (
        <Card className="p-4">
          <CardHeader className="text-default-700 font-bold">
            Customer Info
          </CardHeader>
          <CardBody>
            <div className="flex">
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-default-700">
                  Full Name
                </h3>
                <h3 className="font-semibold text-default-700">
                  Email
                </h3>
                <h3 className="font-semibold text-default-700">
                  UserId
                </h3>
              </div>
              <div className="px-6 flex flex-col justify-center">
                <span className="font-bold text-default-700">:</span>
                <span className="font-bold text-default-700">:</span>
                <span className="font-bold text-default-700">:</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-default-700">
                  {data?.fullName}
                </p>
                <p className="text-default-700">
                  {data?.email}
                </p>
                <p className="text-default-700">
                  {data?._id}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
    )
}

export default CustomerInfo;