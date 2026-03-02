import { configureStore} from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice"
import teacherReducer from "@/redux/slices/TeacherSlice"
import studentReducer  from "@/redux/slices/studentSlice"
import appointmentReducer from "@/redux/slices/AppointmentSlice"
import messageReducer from "@/redux/slices/messageSlice"

export const store =  configureStore({
    reducer : {
        auth : authReducer,
        teacher : teacherReducer,
        student : studentReducer,
        appointment : appointmentReducer,
        message : messageReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch