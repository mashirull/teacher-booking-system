
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToken } from "@/lib/getToken";
import { Appointment } from "@/type/type";


interface InitialState {
    appointmentData: [] | null
    isLoading: Boolean
    error: String | null
    success: String | null
}

const initialState: InitialState = {
    appointmentData: null,
    isLoading: false,
    error: null,
    success: null
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const fetchAppointments = createAsyncThunk("appointment/all", async () => {
    const responce = await fetch(base_url + "/api/appointment/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const updateAppointmentStatus = createAsyncThunk("appointment/approved", async ({status, appointmentId}:Appointment) => {
    const responce = await fetch(base_url + "/api/appointment/update-status", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body : JSON.stringify({status, appointmentId})

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const bookAppointment = createAsyncThunk("appointment/book", async ({teacherId, date, time}:{teacherId : string, date : Date, time : string}) => {
    const responce = await fetch(base_url + "/api/appointment/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body : JSON.stringify({teacherId,date,time})

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})






export const AppointmentSlice = createSlice({
    name: "teacher-slice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAppointments.pending, (state) => {
            state.isLoading = true
            state.error = null
            // state.success = null
        })
            .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<{ all: [] }>) => {
                state.isLoading = false
                state.appointmentData = action.payload.all
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        // for book an appointment
        builder.addCase(bookAppointment.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(bookAppointment.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        // deleting teacher
        // builder.addCase(deleteTeacher.pending, (state) => {
        //     state.isLoading = true
        //     state.error = null
        //     state.success = null
        // })
        //     .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        //         state.isLoading = false
        //         state.success = action.payload.message
        //     })
        //     .addCase(deleteTeacher.rejected, (state, action) => {
        //         state.isLoading = false
        //         state.error = action.error.message
        //     })
        
       // for update appointment status
        builder.addCase(updateAppointmentStatus.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(updateAppointmentStatus.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(updateAppointmentStatus.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
    reducers: {
        clearState : (state)=>{
            state.error = null
            state.success = null
        }
    }
})

export default AppointmentSlice.reducer
export const {clearState} =  AppointmentSlice.actions
