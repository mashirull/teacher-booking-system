import { model, models, Schema } from "mongoose";

const appointmentSchema =  new Schema({
    studentId : {
        type : Schema.Types.ObjectId,
        ref : "students",
        required : true
    },
    teacherId : {
        type : Schema.Types.ObjectId,
        ref : "teachers",
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["pending", "approved", "cancel"],
        default : "pending"
    }

}, {timestamps : true})

export default models.appointment || model("appointment" , appointmentSchema)