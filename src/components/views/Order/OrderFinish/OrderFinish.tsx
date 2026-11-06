import { ITransactionStatus } from "@/pages/order/finish";
import { IOrderResponse } from "@/types/order";
import { Button } from "@heroui/react";
import Link from "next/link";
import renderFinish from "./RenderFinish";

interface TypeProps {
  order: IOrderResponse;
  status: ITransactionStatus["status"];
}
  
const OrderFinish = (props: TypeProps) => {
  const { 
    status,
    order,
  } = props;

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-full flex flex-col items-center justify-center gap-8">
      
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center p-4">
          {renderFinish(order, status).icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-green-500 text-center">
            {renderFinish(order, status).title}
          </h1>
          <p className="text-lg text-center">
            {renderFinish(order, status).description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto">
        <div className="flex justify-between">  
          <span className="font-semibold text-gray-500">Nomor Pesanan</span>
          <span className="font-medium">{renderFinish(order, status).nomor}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Status</span>
          <span className="font-medium">{renderFinish(order, status).status}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Total</span>
          <span className="font-medium">{renderFinish(order, status).total}</span>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
        <Button as={Link} href={`${renderFinish(order, status).button1.link}`} fullWidth className="text-white bg-green-500" size="lg">
          {renderFinish(order, status).button1.text}
        </Button>
        <Button as={Link} href={`${renderFinish(order, status).button2.link}`} fullWidth color="success" variant="flat" >
          {renderFinish(order, status).button2.text}
        </Button>
      </div>

    </div>
  )
}

export default OrderFinish;  