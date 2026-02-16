import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import teacher from "@/models/teacher";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, email, password, department, subject } = await req.json()

        if (!name || !email || !password || !department || !subject) {
            return NextResponse.json({
                message: "missing fields"
            }, { status: 400 })
        }

        const isTeacherExist =  await teacher.findOne({email})
        if(isTeacherExist){
            return NextResponse.json({
                message : "email already exist"
            }, {status:400})
        }

        const {role} =  verifyAuth(req)

        if (role !== "admin") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await teacher.create({
            name,
            email,
            password : hashPassword  ,
            department,
            subject
        });

        return NextResponse.json({
            message: "New teacher created"
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}