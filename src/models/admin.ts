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
    role : {
        type : String,
        default : "admin"
    }
});

export default models.admin || model("admin", studentSchema)