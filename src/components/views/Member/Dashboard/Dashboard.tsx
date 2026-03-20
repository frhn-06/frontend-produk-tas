import { Card, CardBody, Chip, Image, Skeleton } from "@heroui/react";
import useDashboard from "./useDashboard";
import convert from "@/utils/convert";
import { IProductsInOrder } from "@/types/order";

const Dashboard = () => {
    const {
        dataDashboardMember,
        isLoadingDashboardMember
    } = useDashboard();

    return (
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton isLoaded={!!dataDashboardMember?.data?.totalOrders || !isLoadingDashboardMember} className="rounded-2xl">
              <Card className="p-2 min-h-36">
                <CardBody className="gap-4 justify-between">
                  <h1 className="font-semibold text-default-700 text-xl">
                    Total Orders
                  </h1>
                  <h1 className="font-bold text-default-700 text-3xl">
                    {dataDashboardMember?.data?.totalOrders} 
                  </h1>
                </CardBody>
              </Card>
            </Skeleton>
            <Skeleton isLoaded={!!dataDashboardMember?.data?.recentSuccessOrder[0]?.total || !isLoadingDashboardMember} className="rounded-2xl">
              <Card className="p-2 min-h-36">
                <CardBody className="gap-4 justify-between">
                  <h1 className="font-semibold text-default-700 text-xl">
                    Total Spending
                  </h1>
                  <h1 className="font-bold text-default-700 text-3xl">
                    {dataDashboardMember?.data?.recentSuccessOrder[0]?.total ? convert.IDR(dataDashboardMember?.data?.recentSuccessOrder[0]?.total) : "Rp. 0"}
                  </h1>
                </CardBody>
              </Card>
            </Skeleton>
            <Skeleton isLoaded={!!dataDashboardMember?.data && !isLoadingDashboardMember} className="rounded-2xl">
              <Card className="p-2 min-h-36">
                <CardBody className="gap-4 justify-between">
                  <h1 className="font-semibold text-default-700 text-xl">
                    Total Carts
                  </h1>
                  <h1 className="font-bold text-default-700 text-3xl">
                    {dataDashboardMember?.data?.totalCarts}
                  </h1>
                </CardBody>
              </Card>
            </Skeleton>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-default-700">
              Last Order
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {!dataDashboardMember?.data && 
                Array.from({length: 4}).map((_, i) => (
                  <Skeleton key={i} className="rounded-2xl"></Skeleton>
              ))}
              {!isLoadingDashboardMember && dataDashboardMember?.data?.lastOrder?.products ? 
              dataDashboardMember?.data?.lastOrder?.products.map((p: IProductsInOrder) => (
                <Card key={p._id} className="p-2 min-h-36">
                  <CardBody className="gap-4 justify-between">
                    <h1 className="font-semibold text-default-700">
                      {dataDashboardMember?.data?.lastOrder?.orderId} 
                    </h1>
                    <Image src={`${p.productId.image}`} alt="product" className="w-full" />
                    <h1 className="font-bold text-default-700 text-xl">
                      {p.name}
                    </h1>
                    <Chip color="success" variant="flat">
                      {dataDashboardMember?.data?.lastOrder?.status ? "Completed" : ""}
                    </Chip>
                    <p className="text-sm text-default-500">
                      {convert.time1(dataDashboardMember?.data?.lastOrder?.createdAt)}
                    </p>
                  </CardBody>
                </Card>
              )) : (
                <h1 className="text-xl text-default-400">
                  you have never ordered a product
                </h1>
              )}
            </div>
          </div>
        </section>
    )
}

export default Dashboard;