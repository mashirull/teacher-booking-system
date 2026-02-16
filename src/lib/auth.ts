import jwt  from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"


export function verifyAuth(req:NextRequest){
    const token =  req.headers.get("token") as string | null

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY) as {
        userId : string,
        role : string
    }

    return {
        userId : decoded.userId,
        role : decoded.role
    }
}