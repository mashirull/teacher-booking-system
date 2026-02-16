import jwt from "jsonwebtoken"

const JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!


export const generateToken = (payload: {userId:string, role : string})=>{
    return jwt.sign(payload,JWT_SECRET_KEY, {expiresIn : "7d"} )
}