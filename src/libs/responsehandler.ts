import { AxiosError } from "axios"
import { signOut } from "next-auth/react";

interface ErrorResponseData {
    data : {
        name: string;
    }
}

const onErrorHandler = (error: Error) => {
    const err = error as AxiosError;
    const res = err.response?.data as ErrorResponseData;
    if(err.response && res.data.name === "TokenExpiredError") {
        signOut();
    }
}

export {onErrorHandler};