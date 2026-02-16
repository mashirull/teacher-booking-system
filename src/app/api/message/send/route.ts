import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import message from "@/models/message"
import { verifyAuth } from "@/lib/auth";

export async function POST(req:NextRequest) {
    try {
       await connectDB()
       const {role, userId} =  verifyAuth(req)
    
       if(role !== "student" ){
        return NextResponse.json({
            message : "access denied"
        }, {status:401})
       }

       const {teacherId, messageText} =  await req.json();

       const msg = await message.create({
        studentId : userId,
        teacherId,
        messageText
       });

       if(msg){
        return NextResponse.json({
            message : "message send"
        },{status : 201})
       }
    } catch (error:any) {
        return NextResponse.json({
            status: false,
            message: error.message
        }, {status : 500})
    }
}