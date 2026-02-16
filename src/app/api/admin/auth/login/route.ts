import { connectDB } from "@/lib/db";
import { User } from "@/type/type";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/generateToken";
import admin from "@/models/admin";


export async function POST(req: Request) {
    try {
        await connectDB();

        const {email , password} = await req.json();
        if(!email || !password){
            return NextResponse.json({
                message : "email or password is missing"
            }, {status : 400});
        }

        const CurrentUser:User =  await admin.findOne({email}) as any
        if(!CurrentUser){
            return NextResponse.json({
                message : "Admin not exist"
            },{status : 400})
        }

        const isPasswordMatch =  await bcrypt.compare(password, CurrentUser.password)

        if(!isPasswordMatch){
            return NextResponse.json({
                message : "wrong password"
            })
        }

        const token =  generateToken({
            userId : CurrentUser._id.toString(),
            role : CurrentUser.role
        })

        return NextResponse.json({
            message : "login successful",
            user : {
                name : CurrentUser.name,
                email : CurrentUser.email,
                role : CurrentUser.role
            },
            token 
        }, {status : 200})

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}