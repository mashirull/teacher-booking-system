
import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {

    try {
        connectDB();
        const { name, email, department, subject , teacherId} = await req.json()

        if (!name || !email || !department || !subject) {
            return NextResponse.json({
                message: "missing fields"
            }, { status: 400 })
        }
        const {role} =  verifyAuth(req)

        if (role !== "admin") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        await teacher.findByIdAndUpdate(teacherId , {
            name,
            email,
            department,
            subject
        })
        
        return NextResponse.json({
            message: "Teacher updated",
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }

}