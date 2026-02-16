import { connectDB } from "@/lib/db";
import student from "@/models/student";
import { User } from "@/type/type";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/generateToken";


export async function POST(req: Request) {
    try {
        connectDB();

        const {email , password} = await req.json();
        if(!email || !password){
            return NextResponse.json({
                message : "email or password is missing"
            }, {status : 400});
        }

        const CurrentStudent:User =  await student.findOne({email}) as any
        if(!CurrentStudent){
            return NextResponse.json({
                message : "student not exist"
            },{status : 400})
        }

        const isPasswordMatch =  await bcrypt.compare(password, CurrentStudent.password)

        if(!isPasswordMatch){
            return NextResponse.json({
                message : "wrong password"
            })
        }

        const token =  generateToken({
            userId : CurrentStudent._id.toString(),
            role : CurrentStudent.role
        })

        return NextResponse.json({
            message : "login successful",
            user : {
                name : CurrentStudent.name,
                email : CurrentStudent.email,
                role : CurrentStudent.role
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