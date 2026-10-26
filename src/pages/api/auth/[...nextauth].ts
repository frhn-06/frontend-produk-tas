import AuthService from "@/services/auth.service";
import { environment } from "@/utils/environment";
import axios from "axios";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials'

export interface UserExtended extends User {
    role?: string;
    accessToken?: string;
}

export interface JwtExtended extends JWT {
    user?: UserExtended;
}

export interface sessionExtened extends Session {
    accessToken?: string;
}


export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60*60
    },
    secret: environment.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: {label: "identifier", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials: Record<"identifier" | "password", string> | undefined) : Promise<UserExtended | null> {
                const {identifier, password} = credentials as {identifier: string; password: string;}

                // const result = await AuthService.login({
                //     identifier: identifier,
                //     password: password
                // });

                const responseLogin = await fetch(
                    `${environment.API_URL}/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            identifier,
                            password
                        })
                    }
                )
                
                const resultLogin = await responseLogin.json();
                console.log("LOGIN STATUS:", responseLogin.status);
                console.log("LOGIN RESPONSE:", {
                ok: responseLogin.ok,
                keys: Object.keys(resultLogin),
                dataType: typeof resultLogin.data,
                });

                const accessToken = resultLogin.data;
                
                // const me = await AuthService.getProfileWithToken(accessToken);
                const responseMe = await fetch(
                    `${environment.API_URL}/auth/me`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )

                const resultMe = await responseMe.json();
                console.log("ME STATUS:", responseMe.status);
                console.log("ME RESPONSE:", {
                ok: responseMe.ok,
                keys: Object.keys(resultLogin),
                dataType: typeof resultMe.data,

                });
                // const user = me.data.data;
                if(!responseMe.ok) return null;
                
                const user = resultMe.data;

                // if(accessToken && result.status === 200 && user._id && me.status === 200) {
                //     user.accessToken = accessToken;
                //     return user;
                // } else {
                //     return null;
                // }
                if(accessToken && user.id) {
                    return {
                        ...user,
                        accessToken
                    }
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user} : {token: JwtExtended; user: UserExtended | null;}) {
            if(user) {
                token.user = user;
            }

            return token;
        },

        async session({session, token}: {session: sessionExtened; token: JwtExtended;}) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session;
        }
    }
})