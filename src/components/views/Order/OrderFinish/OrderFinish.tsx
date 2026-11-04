import { ITransactionStatus } from "@/pages/order/finish";
import Link from "next/link";

interface TypeProps {
  status: ITransactionStatus["status"];
}
  
const OrderFinish = (props: TypeProps) => {
  const { 
    status 
  } = props;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Order {status}
      </h1>
      <p className="text-lg text-center">
        Thank you for your order!
      </p>

      <Link href="/" className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Back to Home
      </Link>
    </div>
  )
}

export default OrderFinish;  