import AuthService from "@/services/auth.service";
import { environment } from "@/utils/environment";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials'

interface UserExtended extends User {
    role?: string;
    accessToken?: string;
}

interface JwtExtended extends JWT {
    user?: UserExtended;
}

interface sessionExtened extends Session {
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

                const result = await AuthService.login({
                    identifier: identifier,
                    password: password
                });

                const accessToken = result.data.data;
                
                const me = await AuthService.getProfileWithToken(accessToken);
                const user = me.data.data;

                if(accessToken && result.status === 200 && user._id && me.status === 200) {
                    user.accessToken = accessToken;
                    return user;
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