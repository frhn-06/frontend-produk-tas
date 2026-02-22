import { createContext, ReactNode, useState } from "react";


export type IGender = {
    pria: boolean;
    wanita: boolean;
    anak: boolean;
}

interface ITouch {
    touchGender: IGender,
    setTouchGender: (touchGender: {pria: boolean; wanita: boolean; anak: boolean}) => void;
}

export const TouchGenderFotoContext = createContext<ITouch>({
    touchGender : {
        pria: false,
        wanita: false,
        anak: false,
    },
    setTouchGender: () => {}
});


const TouchGenderProvider = ({children}: {children: ReactNode}) => {
    const [touchGender, setTouchGender] = useState({
        pria: false,
        wanita: false,
        anak: false
    })

    return (
        <TouchGenderFotoContext.Provider value={{touchGender, setTouchGender}}>
            {children}
        </TouchGenderFotoContext.Provider>
    )
}

export default TouchGenderProvider;;

