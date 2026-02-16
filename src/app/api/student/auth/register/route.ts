import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import student from "@/models/student";


export async function POST(req:Request) {
    try {
        connectDB()

        const {name, email, password} =  await req.json();

        if(!name || !email || !password){
            return NextResponse.json({
                message : "all fields are required"
            }, {status : 400});
        }

        const CurrentStudent =  await student.findOne({email})
        if(CurrentStudent){
            return NextResponse.json({
                message : "Student already exist"
            }, {status:400})
        }

        const hashedPassword =  await bcrypt.hash(password, 10)
        
        await student.create({
            name,
            email,
            password : hashedPassword
        })

        return NextResponse.json({
            message : "student created successfully"
        }, {status : 201})


    } catch (error:any) {
        return NextResponse.json({
            message : "something went wrong",
            error : error.message
        },{status:500})
    }
}