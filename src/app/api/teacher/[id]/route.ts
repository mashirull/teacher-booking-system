import { connectDB } from "@/lib/db";
import teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()

        const { id } = await params

        const singleTeacher = await teacher.findOne({ _id: id }).select("-password")

        if (singleTeacher) {
            return NextResponse.json({
                message: "fetch successfully",
                teacher: singleTeacher
            }, { status: 200 })
        }else {
            throw new Error("Cant't find teacher")
        }


    } catch (error: any) {
        return NextResponse.json({
            message: "somthings went wrong!",
            error: error.message
        }, { status: 500 })
    }
}