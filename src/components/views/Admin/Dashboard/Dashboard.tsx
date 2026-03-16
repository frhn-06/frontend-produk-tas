import { Card, CardBody, CardHeader, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import useDashboard from "./useDashboard";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import convert from "@/utils/convert";

const Dashboard = () => {
		const {
			dataDashboardAdmin,
			isLoadingDashboardAdmin
		} = useDashboard();

    return (
        <section>
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
						<Skeleton isLoaded={!!dataDashboardAdmin?.data?.totalProducts && !isLoadingDashboardAdmin} className="rounded-2xl">
							<Card className="p-2 min-h-36">
								<CardBody className="gap-4 justify-between">
									<h1 className="font-semibold text-default-700 text-xl">
										Total Products
									</h1>
									<h1 className="font-bold text-default-700 text-3xl">
										{dataDashboardAdmin?.data?.totalProducts}
									</h1>
								</CardBody>
							</Card>
						</Skeleton>
						<Skeleton isLoaded={!!dataDashboardAdmin?.data?.totalUsers && !isLoadingDashboardAdmin} className="rounded-2xl">
							<Card className="p-2 min-h-36">
								<CardBody className="gap-4 justify-between">
									<h1 className="font-semibold text-default-700 text-xl">
										Total Users
									</h1>
									<h1 className="font-bold text-default-700 text-3xl">
										{dataDashboardAdmin?.data?.totalUsers}
									</h1>
								</CardBody>
							</Card>
						</Skeleton>
						<Skeleton isLoaded={!!dataDashboardAdmin?.data?.totalCategories && !isLoadingDashboardAdmin} className="rounded-2xl">
							<Card className="p-2 min-h-36">
								<CardBody className="gap-4 justify-between">
									<h1 className="font-semibold text-default-700 text-xl">
										Total Categories
									</h1>
									<h1 className="font-bold text-default-700 text-3xl">
										{dataDashboardAdmin?.data?.totalCategories}
									</h1>
								</CardBody>
							</Card>
						</Skeleton>
						<Skeleton isLoaded={!!dataDashboardAdmin?.data?.totalOrders && !isLoadingDashboardAdmin} className="rounded-2xl">
							<Card className="p-2 min-h-36">
								<CardBody className="gap-4 justify-between">
									<h1 className="font-semibold text-default-700 text-xl">
										Total Orders
									</h1>
									<h1 className="font-bold text-default-700 text-3xl">
										{dataDashboardAdmin?.data?.totalOrders}
									</h1>
								</CardBody>
							</Card>
						</Skeleton>
					</div>

					<div className="mt-8 flex flex-col lg:flex-row gap-4">
						<div className="flex-2">
							<LineChart style={{ width: '100%', aspectRatio: 1.618 }} responsive data={dataDashboardAdmin?.data?.revenueChart} className=" bg-white rounded-2xl shadow-lg p-4">
								<CartesianGrid />
								<Line dataKey="revenue" dot={{ r:6 }} />
								<XAxis dataKey="month" />
								<YAxis />
								<Legend />
							</LineChart>
						</div>

						<div className="lg:flex-1 w-full min-h-24 flex flex-col gap-2">
							<h2 className="text-default-700 font-bold text-xl">
								Total Orders
							</h2>
							<Skeleton  isLoaded={!!dataDashboardAdmin?.data?.recentSuccessOrder && !!dataDashboardAdmin?.data?.recentPendidngOrder && !isLoadingDashboardAdmin} className="rounded-2xl">
								<Table className="min-h-24">
									<TableHeader>
										<TableColumn>STATUS</TableColumn>
										<TableColumn>QTY</TableColumn>
										<TableColumn>TOTAL</TableColumn>
									</TableHeader>
									<TableBody>
										<TableRow key="1">
											<TableCell>Success</TableCell>
											<TableCell>{dataDashboardAdmin?.data?.SuccessOrders}</TableCell>
											<TableCell>{convert.IDR(dataDashboardAdmin?.data?.recentSuccessOrder[0].total)}</TableCell>
										</TableRow>
										<TableRow key="2">
											<TableCell>Pending</TableCell>
											<TableCell>{dataDashboardAdmin?.data?.pendingOrders}</TableCell>
											<TableCell>{convert.IDR(dataDashboardAdmin?.data?.recentPendidngOrder[0].total)}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Skeleton>
						</div>
					</div>
					
				</section>
    )
}

export default Dashboard;