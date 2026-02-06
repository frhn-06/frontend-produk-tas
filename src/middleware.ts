import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { environment } from "./utils/environment";
import { JwtExtended } from "./pages/api/auth/[...nextauth]";

export async function middleware(request: NextRequest) {
    const token : JwtExtended | null = await getToken({
        req: request,
        secret: environment.NEXTAUTH_SECRET
    })

    const {pathname} = request.nextUrl;

    if(pathname === "/auth/login" || pathname === "/auth/register") {
        if(token) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    if(pathname === "/login") {
        if(token) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if(pathname === "/register") {
        if(token) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        
        return NextResponse.redirect(new URL("/auth/register", request.url));
    }

    if(pathname.startsWith("/admin")) {
        if(!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        if(token?.user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        if(pathname === "/admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    if(pathname.startsWith("/member")) {
        if(!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        if(pathname === "/member") {
            return NextResponse.redirect(new URL("/member/dashboard", request.url));
        }
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/login", "/register", "/auth/:path*", "/admin/:path*", "/member/:path*"]
}
