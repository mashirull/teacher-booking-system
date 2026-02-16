import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import message from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
         const {role, userId} =  verifyAuth(req)
        
        if (role !== "teacher") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        const msgs = await message.find({ teacherId:userId })
            .populate({
                path: "studentId",
                select: "name email"
            })


        return NextResponse.json({
            message : "fetch successful",
            allMessage : msgs
        }, {status:200})


    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            eror: error.message
        }, { status: 500 })
    }
}