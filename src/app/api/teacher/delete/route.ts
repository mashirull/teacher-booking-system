import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        connectDB();
        const {role} =  verifyAuth(req)

        if (role !== "admin") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        const {teacherId} = await req.json();

        await teacher.findByIdAndDelete({ _id: teacherId })

        return NextResponse.json({
            message: "Teacher deleted",
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}