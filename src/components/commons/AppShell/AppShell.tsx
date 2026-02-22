import { ReactNode, useContext, useEffect } from "react";

import {Raleway, Rubik} from 'next/font/google';
import { cn } from "@heroui/react";
import { toasterContext } from "@/context/toasterContext";

import Toaster from "@/components/ui/Toaster";
import { IGender, TouchGenderFotoContext } from "@/context/TouchGenderFotoContext";


const fontRaleaway = Raleway({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] 
})

const fontRubik = Rubik({
    subsets: ['latin'],
    weight: ["300", "400", "500", "600", "700", "800", "900"] 
})


interface TypeProps {
    children: ReactNode;
}

const AppShell = (props: TypeProps) => {
    const {
        children
    } = props;

    const {toaster, setToaster} = useContext(toasterContext);

    const {touchGender, setTouchGender} = useContext(TouchGenderFotoContext);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setToaster({
                message: "",
                type: ""
            })
        }, 4000); 
        return () => clearTimeout(timeOut);
    },[toaster]);


    const handleTouchGender = (touchGender: IGender, set: (touchGender: IGender) => void) => {
        if(Object.values(touchGender).some(value => value === true)) {
            set({
                pria: false,
                wanita: false,
                anak: false
            });
        }
    }

    return (
        <main className={cn(fontRubik.className)} onTouchStart={() => handleTouchGender(touchGender, setTouchGender)}>
            {children}
            {toaster.type !== "" && <Toaster message={toaster.message} type={toaster.type} /> }  
        </main>
    )
}

export default AppShell