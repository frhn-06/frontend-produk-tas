import { ICart } from "@/types/cart";
import { cn } from "@/utils/cn";
import { SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface TypeProps {
  angka: number;
  setAngka: React.Dispatch<SetStateAction<number>>
  size?: "sm" | "md" | "lg";
  onPlus: (e: string) => void;
  onMin: (e: string) => void;
  data: ICart;
}

const PlusMinusAngka = (props: TypeProps) => {
    const {
      angka,
      setAngka,
      size = "md",
      onPlus,
      onMin,
      data
    } = props;

    const handlePlus = (angka: number) => {
      setAngka(angka + 1);
      onPlus(`${data?.productId?._id}`)
    }
    const handleMin = (angka: number) => {
      setAngka(angka - 1);
      onMin(`${data?.productId?._id}`);
    }

    return (
      <div className={cn("flex items-center justify-between bg-gray-200 rounded-lg", { "h-8" :size === "sm", "h-10" :size === "md" ,"h-12" :size === "lg"})}>
        <button className="p-3 rounded-lg text-default-700 disabled:text-default-400" disabled={angka === 1} onClick={() => handleMin(angka)}>
          <FaMinus className={cn("cursor-pointer", {"h-3 w-3": size === "sm", "h-4 w-4": size === "md", "h-5 w-5": size === "lg" })} />
        </button>
        <div className="p-3 rounded-lg text-default-700">
          {angka}
        </div>
        <button className="p-3 rounded-lg text-default-700 disabled:text-default-400" onClick={() => handlePlus(angka)}>
          <FaPlus className={cn("cursor-pointer", {"h-3 w-3": size === "sm", "h-4 w-4": size === "md", "h-5 w-5": size === "lg" })} />
        </button>
      </div>
    )
}


export default PlusMinusAngka;