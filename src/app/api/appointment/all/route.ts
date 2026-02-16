import { connectDB } from "@/lib/db";
import appointment from "@/models/appointment";
import { NextRequest, NextResponse } from "next/server";
import "@/models/student";
import "@/models/teacher"
import { verifyAuth } from "@/lib/auth";

 
export async function GET(req:NextRequest) {
    try {
        await connectDB()
       const {role, userId} =  verifyAuth(req)
        
        if (role !== "teacher") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        const allAppointments =  await appointment.find({teacherId : userId})
        .populate({
            path : "studentId",
            select : "name email"
        })

        if(allAppointments){
            return NextResponse.json({
                message : "fetch successfully",
                all : allAppointments
            },{status : 200})
        }

    } catch (error:any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}