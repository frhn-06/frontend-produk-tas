import OrderLayout from "@/components/layouts/OrderLayout";
import OrderFinish from "@/components/views/Order/OrderFinish/OrderFinish";
import OrderService from "@/services/order.sercive";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { CustomSession } from "@/libs/axios";
import { IOrderResponse } from "@/types/order";
import axios from "axios";

interface ITransactionStatus {
    status: "pending" | "paid" | "cancelled" | "expired" | "completed" | null;
}


export const getServerSideProps : GetServerSideProps = async (context) => {
    try {
        const session : CustomSession | null = await getServerSession(context.req, context.res, authOptions);
        if(!session?.accessToken) {
            return {
                props: {
                    status: null,
                    unAuthorize: true
                }
            }
        }


        const orderId = context.query.order_id;

        const result = await OrderService.finish(`${orderId}`, `${session?.accessToken}`);
        console.log("result", result?.data?.data);

        const status : ITransactionStatus["status"] = result?.data?.data?.order?.status || null;
        const order = result?.data?.data?.order;

        return {
            props: {
                status,
                order,
                error: null
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        if(axios.isAxiosError(error)) {
             if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
                return {
                    props: {
                    status: null,
                    order: null,
                    error: {
                        status: 504,
                        message: "Server membutuhkan waktu terlalu lama untuk merespons."
                    }
                    }
                };
            }

            if (!error.response) {
                return {
                    props: {
                    status: null,
                    order: null,
                    error: {
                        status: 503,
                        message: "Tidak dapat terhubung ke server."
                    }
                    }
                };
            }

            return {
                props: {
                    status: null,
                    order: null,
                    error: {
                    status: error.response.status,
                    message: error.response.data?.meta?.message ?? error.message
                    }
                }
            }
        }

        return {
            props: {
                status: null,
                order: null,
                error: {
                    status: 500,
                    message: error instanceof Error ? error.message : "Terjadi Kesalahan"
                }
            }
        }
    }
}


interface TypeProps {
    status: ITransactionStatus["status"];
    order: IOrderResponse;
    unAuthorize?: boolean;
    error?: {
        status?: number;
        message?: string
    }
}

const PageOrderFinish = (props: TypeProps) => {
    const {
        status,
        order,
        unAuthorize,
        error
    } = props;

    console.log(error)

    return (
        <OrderLayout title="Order Finish | Velaro">
            {error ? (
                <div className="w-full max-w-3xl flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">
                        {error.status}
                    </h1>
                    <h2 className="text-xl font-medium">
                        {error.message}
                    </h2>
                </div>
            ) : unAuthorize ? (
                <div className="w-full max-w-3xl flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">
                        401
                    </h1>
                    <h2 className="text-xl font-medium">
                        Unauthorized
                    </h2>
                </div>
            ) : (
                <OrderFinish 
                    order={order}
                    status={status}
                /> 
            )}
        </OrderLayout>
    )
}

export type { ITransactionStatus };

export default PageOrderFinish;