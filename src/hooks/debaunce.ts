import { useRef } from "react"

const useDebaunce = () => {

    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null) 
    
    const debaunce = ((func: () => void, delay: number) => {
        if(timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }
        
        timeOutRef.current = setTimeout(() => {
            func();
        }, delay);
    });

    return {
        debaunce
    }
}

export default useDebaunce;