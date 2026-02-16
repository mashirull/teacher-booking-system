import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import appointment from "@/models/appointment";
import student from "@/models/student";
import { User } from "@/type/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        connectDB();
         const {role, userId} =  verifyAuth(req)

        if (role !== "student") {
            return NextResponse.json({
                message: "Can't book appointment"
            }, { status: 401 })
        }
        const {teacherId, date, time} = await req.json();

        const CurrentStudent:User = await student.findById(userId) as any

        if(CurrentStudent?.status === "pending"){
            return NextResponse.json({
                message : "Your registration is pending, please wait to approved"
            }, {status:401})
        }
    
        await appointment.create({
            studentId : userId,
            teacherId,
            date,
            time
        })

        return NextResponse.json({
            message : "appointment booked"
        }, {status : 201})

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}