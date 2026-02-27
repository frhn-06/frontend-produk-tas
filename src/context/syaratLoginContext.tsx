import { createContext, ReactNode, useState } from "react";

interface ISyaratLoginContext {
    syaratLogin: {
        isOpen: boolean;
        type :string;
    },
    setSyaratLogin: (syaratLogin: {isOpen: boolean; type: string}) => void;
}

export const syaratLoginContext = createContext<ISyaratLoginContext>({
    syaratLogin: {
        isOpen: false,
        type: ""
    },
    setSyaratLogin: () => {}
});



const SyaratLoginProvider = ({children} : {children: ReactNode}) => {
    const [syaratLogin, setSyaratLogin] = useState({
        isOpen: false,
        type: ""
    });

    return (
        <syaratLoginContext.Provider value={{syaratLogin, setSyaratLogin}}>
            {children}
        </syaratLoginContext.Provider>
    )
}


export default SyaratLoginProvider;