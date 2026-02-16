import { connectDB } from "@/lib/db";
import { User } from "@/type/type";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/generateToken";
import teacher from "@/models/teacher";


export async function POST(req: Request) {
    try {
        connectDB();

        const {email , password} = await req.json();
        if(!email || !password){
            return NextResponse.json({
                message : "email or password is missing"
            }, {status : 400});
        }

        const CurrentTeacher:User =  await teacher.findOne({email}) as any
        if(!CurrentTeacher){
            return NextResponse.json({
                message : "teacher not exist"
            },{status : 400})
        }

        const isPasswordMatch =  await bcrypt.compare(password, CurrentTeacher.password)

        if(!isPasswordMatch){
            return NextResponse.json({
                message : "wrong password"
            })
        }

        const token =  generateToken({
            userId : CurrentTeacher._id.toString(),
            role : CurrentTeacher.role
        })

        return NextResponse.json({
            message : "login successful",
            user : {
                name : CurrentTeacher.name,
                email : CurrentTeacher.email,
                role : CurrentTeacher.role
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