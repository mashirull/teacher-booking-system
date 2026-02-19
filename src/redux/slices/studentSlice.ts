import { getToken } from "@/lib/getToken";
import { Student, Teacher } from "@/type/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    studentData: [] | null
    isLoading: Boolean
    error: String | null
    success: String | null
}

const initialState: InitialState = {
    studentData: null,
    isLoading: false,
    error: null,
    success: null
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const fetchStudent = createAsyncThunk("student/list", async () => {
    const responce = await fetch(base_url + "/api/student/list", {
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

export const approvedRegistration = createAsyncThunk("student/approval", async ({ studentId, status }: Student) => {
    const responce = await fetch(base_url + "/api/admin/approve-student-reg", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body: JSON.stringify({ studentId, status })

    })

    console.log(studentId);
    

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.error)
    }
    
    return data
})


const studentSlice = createSlice({
    name: "student-slice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStudent.pending, (state) => {
            state.isLoading = true
            state.error = null
            // state.success = null
        })
            .addCase(fetchStudent.fulfilled, (state, action: PayloadAction<{ students: [] }>) => {
                state.isLoading = false
                state.studentData = action.payload.students
            })
            .addCase(fetchStudent.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        // approved student registration
        builder.addCase(approvedRegistration.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(approvedRegistration.fulfilled, (state, action: PayloadAction<{ message : string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(approvedRegistration.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
    reducers: {}
})


export default studentSlice.reducer