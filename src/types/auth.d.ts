interface IRegister {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ILogin {
    identifier: string;
    password: string;
}


interface UserExtended extends User {
    accessToken?: string;
    role?: string
}

interface IUser {
    _id?:string;
    userName?: string;
    fullName?: string;
    email?: string;
    role?: string;
    profilePicture?: string;
    phone?: string;
    address?: string;
    coodinate?: number[];
}

interface IPassword {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}


export {IRegister, ILogin, UserExtended, IUser, IPassword}