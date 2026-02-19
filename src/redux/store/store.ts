import { configureStore} from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice"
import teacherReducer from "@/redux/slices/TeacherSlice"
import studentReducer  from "@/redux/slices/studentSlice"

export const store =  configureStore({
    reducer : {
        auth : authReducer,
        teacher : teacherReducer,
        student : studentReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch