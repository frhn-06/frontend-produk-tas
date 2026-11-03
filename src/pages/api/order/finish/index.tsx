"use client"

import OrderLayout from "@/components/layouts/OrderLayout";
import OrderFinish from "@/components/views/Order/OrderFinish/OrderFinish";

const PageApiOrderFinish = () => {
    return (
        <OrderLayout title="Order Finish | Velaro">
            <OrderFinish /> 
        </OrderLayout>
    )
}

export default PageApiOrderFinish;