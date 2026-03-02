
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToken } from "@/lib/getToken";
import { Appointment } from "@/type/type";


interface InitialState {
    messageData: [] | null
    isLoading: Boolean
    error: String | null | undefined
    success: String | null
}

const initialState: InitialState = {
    messageData: null,
    isLoading: false,
    error: null,
    success: null
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const fetchMesages = createAsyncThunk("message/get", async () => {
    const responce = await fetch(base_url + "/api/message/get", {
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


export const sendMessage =  createAsyncThunk("message/send" , async ({teacherId, messageText, appointmentId}:{teacherId : string, messageText:string, appointmentId : string})=>{
    const responce =  await fetch(base_url + "/api/message/send" ,  {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            token : getToken()
        },
        body : JSON.stringify({teacherId, messageText, appointmentId})
    })

    const data = await responce.json()
    if(!responce.ok){
        throw new Error(data.message)
    }

    return data
})







export const messageSlice = createSlice({
    name: "teacher-slice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMesages.pending, (state) => {
            state.isLoading = true
            state.error = null
            // state.success = null
        })
            .addCase(fetchMesages.fulfilled, (state, action: PayloadAction<{ allMessage: [] }>) => {
                state.isLoading = false
                state.messageData = action.payload.allMessage
            })
            .addCase(fetchMesages.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        // for send the message to teacher for approved the appointment
        builder.addCase(sendMessage.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(sendMessage.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        
        
    },
    reducers: {

    }
})

export default messageSlice.reducer
