import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import appointment from "@/models/appointment";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        connectDB();
        const {role, userId} = verifyAuth(req)

        if (role !== "student") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        const myAppointments  = await appointment.find({studentId  :userId })
        .populate({
            path : "teacherId",
            select : "name email"
        })

        return NextResponse.json({
            myAppointments
        },{status : 200})
      
    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}