
import { NextRequest, NextResponse } from "next/server"


export async function proxy(req:NextRequest) {

    try {
        const token =  req.headers.get("token")

    const pathname =  req.nextUrl.pathname

    if(pathname.startsWith("/api/student/auth/register") || pathname.startsWith("/api/student/auth/login") || pathname.startsWith("/api/admin/auth/login") || pathname.startsWith("/api/teacher/auth/login")){
        return NextResponse.next()
    }


    if(!token){
        return NextResponse.json({
            message : "Unauthorized access"
        },{status:401})
    }

    // const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY) as {userId : string , role : string}

    // const res =  NextResponse.next()
    // res.cookies.set("userId" , decoded.userId)
    // res.cookies.set("role" , decoded.role)


    return NextResponse.next()
    } catch (error:any) {
        return NextResponse.json({
            message : "invalid token or expire",
            error : error.message
        })
    }
    
}

export const config = {
  matcher: ["/api/:path*"],
};