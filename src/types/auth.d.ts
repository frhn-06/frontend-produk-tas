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


export {IRegister, ILogin, UserExtended}