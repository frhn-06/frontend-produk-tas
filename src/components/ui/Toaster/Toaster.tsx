import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";

const listToaster: Record<string, ReactNode> = {
  success: <IoIosCheckmarkCircle className="h-12 w-12 text-success" />,
  error: <MdError className="h-12 w-12 text-danger" />
}

interface TypeProps {
  message: string;
  type: string;
}


const Toaster = (props: TypeProps) => {
    const {
      message,
      type
    } = props;

    return (
        <div className="flex gap-2 items-center justify-between w-fit max-w-62 p-2 rounded-xl shadow-md shadow-default fixed top-5 right-5 bg-white z-20">
          {listToaster[type]}
          <p className={cn( {"text-success" : type === "success", "text-danger" : type === "error"} )}>
            {message}
          </p>
        </div>
    )
}

export default Toaster;