import { createContext, ReactNode, useState } from "react";

interface ICHildren {
    children: ReactNode;
}

interface IToasterContext {
    toaster: {
        message: string;
        type: string;
    },
    setToaster: (toaster: { message: string; type: string; }) => void
}

export const toasterContext = createContext<IToasterContext>({
    toaster: {
        message: "",
        type: ""
    },
    setToaster: () => {}
})


const ToasterProvider = ({children} : ICHildren) => {
    const [toaster, setToaster] = useState({
        message: "",
        type: ""
    });

    return (
        <toasterContext.Provider value={{toaster, setToaster}}>
            {children}
        </toasterContext.Provider>
        
    )
}

export default ToasterProvider;