import { cn } from "@heroui/react";

interface TypeProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  size?: "lg" | "sm" | "md",
  className?: string;
}

const Burger = (props: TypeProps) => {
    const {
      isOpen,
      setOpen,
      color = "bg-default-700",
      size = "md",
      className
    } = props;

    return (
        <div className={cn("h-8 w-12 flex flex-col justify-between scale-1", className, {"scale-[0.8]" : size === "md", "scale-[0.6]" : size === "sm"})} onClick={() => setOpen(!isOpen)}>
          <span className={cn(`rounded-sm h-1 transition-all duration-300 ${color}`, {"-rotate-45 translate-y-3.5 -translate-x-0.8" : !isOpen})} ></span>
          <span className={cn(`rounded-sm h-1 transition-all duration-300 ${color}`, {"scale-0": !isOpen})} ></span>
          <span className={cn(`rounded-sm h-1 transition-all duration-300 ${color}`, {"rotate-45 -translate-y-3.5 translate-x-0.8": !isOpen})} ></span>
        </div>
    )
}

export default Burger;