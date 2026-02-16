import { connectDB } from "@/lib/db";
import teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        connectDB();
        const teachers = await teacher.find().select("-password -role")

        return NextResponse.json({
            message: "Teacher fetch successfuly",
            teachers
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}