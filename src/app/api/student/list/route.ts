import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { role } = verifyAuth(req)

        if (role !== "admin") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        const students = await student.find().select("-password -role")

        return NextResponse.json({
            message: "Student fetch successfuly",
            students
        }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}