import { cn } from "@/utils/cn";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface TypeProps {
  dataStar: number;
  comment?: number;
  size?: "sm" | "lg" | "md";
  text?: "sm" | "md";
  disabledComment?: boolean;
  disabledAngka?: boolean
}

const StarUi = (props: TypeProps) => {
    const {
      dataStar,
      comment,
      size = "lg",
      text = "md",
      disabledComment = false,
      disabledAngka = false
    } = props;

    return (
        <div className={cn("flex items-center gap-2")}>
          <div className="flex">
            {[1,2,3,4,5].map((star) => 
            dataStar && dataStar >= star ? (
              <IoStar key={star} className={cn("text-yellow-400", {"h-4 w-4" : size === "md", "h-3 w-3": size === "sm", "h-5 w-5": size === "lg" })} />
            ) : dataStar && dataStar >= star - 0.5 ? (
              <IoStarHalf key={star} className={cn("text-yellow-400", {"h-4 w-4" : size === "md", "h-3 w-3": size === "sm", "h-5 w-5": size === "lg" })} />
            ) : (
              <IoStarOutline key={star} className={cn("text-yellow-400", {"h-4 w-4" : size === "md", "h-3 w-3": size === "sm", "h-5 w-5": size === "lg" })} />
            ))}
          </div>
      
          <span className={cn("text-default-400", {"text-base" : text === "md", "text-sm" : text === "sm"})}>
            {comment && !disabledComment ? `${dataStar} (${comment} reviews)` : !disabledAngka && `${dataStar}`}
          </span>           
        </div>
    )
}

export default StarUi;