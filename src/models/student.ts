import { Schema, models, model } from "mongoose";


const studentSchema =  new Schema({
    name : {
        type : String, 
        required  : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    password : {
        type : String,
        require : true
    },
    status : {
        type : String,
        enum : ["pending", "approved"],
        default : "pending"
    },
    role : {
        type : String,
        default : "student"
    }
}, {timestamps : true});

export default models.students || model("students", studentSchema)