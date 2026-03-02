import { verifyAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import appointment from "@/models/appointment";
import student from "@/models/student";
import { Appointment, User } from "@/type/type";

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
        const myAppointments  = await appointment.find({studentId : userId}) as any

        const bookingData =  new Date(date)
       
        const todayBookedAppointment = myAppointments.filter(((apptmnt : Appointment) => new Date(apptmnt?.createdAt).getDate() === bookingData.getDate()  ))


        if(CurrentStudent?.status === "pending"){
            return NextResponse.json({
                message : "Your registration is pending, please wait to approved"
            }, {status:401})
        }

        if(todayBookedAppointment.length !== 0){
            return NextResponse.json({
                message : "You already booked the appointment for today"
            }, {status:400})
        }


    
        await appointment.create({
            studentId : userId,
            teacherId,
            date,
            time
        })

        return NextResponse.json({
            message : "appointment booked",
            // todayBookedAppointment,
            // myAppointments
        }, {status : 201})

    } catch (error: any) {
        return NextResponse.json({
            message: "something went wrong",
            error: error.message
        }, { status: 500 })
    }
}