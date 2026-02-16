
import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import appointment from "@/models/appointment";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {

    try {
        connectDB();
        const {appointmentId, status} = await req.json()

        if(!["pending", "approved", "cancel"].includes(status)){
            return NextResponse.json({
                message : "Invalid status"
            },{status : 400})
        }

        if (!appointmentId) {
            return NextResponse.json({
                message: "missing fields"
            }, { status: 400 })
        }
        const {role} =  verifyAuth(req)
        if (role !== "teacher") {
            return NextResponse.json({
                message: "access denied"
            }, { status: 401 })
        }

        await appointment.findByIdAndUpdate(appointmentId , {status})
            
        
        
        return NextResponse.json({
            message: "status updated",
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }

}