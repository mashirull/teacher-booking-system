import { model, models, Schema } from "mongoose";

const messageSchema =  new Schema({
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
    messageText : {
        type : String,
        required : true
    }
}, {timestamps:true});

export default models.message || model("message", messageSchema)