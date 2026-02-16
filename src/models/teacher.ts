import { Schema, models, model } from "mongoose";


const teacherSchema =  new Schema({
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
    department : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "teacher"
    }
}, {timestamps:true});

export default models.teachers || model("teachers", teacherSchema)