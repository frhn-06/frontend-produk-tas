import { useEffect, useState } from "react";
import useSloganAtas from "./useSloganAtas";
import { cn } from "@heroui/react";

const SloganAtas = () => {

    const {
      texts
    } = useSloganAtas();

    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        
        setIndex((prev) => (prev + 1) % texts.length);
        
      }, 3000);

      return () => clearInterval(interval);

    },[])


    return (
        <div className={cn("bg-black h-12 overflow-hidden")}>
          {texts.map((t: string, i) => (
            <div key={i} className={cn("min-h-12 px-2 min-w-screen flex items-center justify-center transition duration-300 ", {"-translate-y-[100%]": index === 1}, {"-translate-y-[200%]": index === 2}, {"translate-y-0": index === 0},)}>
              <p className="text-default-100 text-sm text-center">
                {t}
              </p>
            </div>
          ))}
        
        </div>    
    )
}

export default SloganAtas;