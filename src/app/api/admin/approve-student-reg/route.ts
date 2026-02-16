
import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {

    try {
        connectDB();
        const {studentId,status} = await req.json()

        
        const {role} =  verifyAuth(req)

        if(!['pending', 'approved'].includes(status)){
            return NextResponse.json({
                message: "Invalid status"
            }, { status: 40 })
        }

        if (role !== "admin") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        await student.findByIdAndUpdate(studentId, {status})
            
        return NextResponse.json({
            message: "student status updated",
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }

}