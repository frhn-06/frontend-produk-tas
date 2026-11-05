import OrderLayout from "@/components/layouts/OrderLayout";
import OrderFinish from "@/components/views/Order/OrderFinish/OrderFinish";
import OrderService from "@/services/order.sercive";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { CustomSession } from "@/libs/axios";

interface ITransactionStatus {
    status: "pending" | "paid" | "cancelled" | "expired" | "completed" | null;
}


export const getServerSideProps : GetServerSideProps = async (context) => {
    try {
        const session : CustomSession | null = await getServerSession(context.req, context.res, authOptions);
        if(!session?.accessToken) {
            return {
                props: {
                    status: null
                }
            }
        }


        const orderId = context.query.order_id;
        console.log("orderId", orderId);
        if (typeof orderId !== "string") {
            return {
                props: {
                    status: null
                }
            }
        }


        const result = await OrderService.finish(`${orderId}`, session.accessToken);
        console.log("result", result?.data?.data);

        const status : ITransactionStatus["status"] = result?.data?.data?.order?.status || null;

        return {
            props: {
                status
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        if((error as {message: string}).message === "transaction status requires further handling") {
            return {
                props: {
                    status: "needs_status_handling"
                }
            }
        }

        return {
            props: {
                status: null
            }
        }
    }
}


interface TypeProps {
    status: ITransactionStatus["status"];
}

const PageOrderFinish = (props: TypeProps) => {
    const {
        status
    } = props;

    return (
        <OrderLayout title="Order Finish | Velaro">
            <OrderFinish status={status} /> 
        </OrderLayout>
    )
}

export type { ITransactionStatus };

export default PageOrderFinish;